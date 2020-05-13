(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-editor', ['ngSanitize'])
        .controller('EditorController', [
            '$actionsCopy',
            '$actionsUpload',
            '$actionsDownload',
            '$actionsPrint',
            'horizon.framework.widgets.toast.service',
            '$uibModalInstance',
            '$scope',
            '$policy',
            function($actionsCopy, $actionsUpload, $actionsDownload, $actionsPrint, toastService, $uibModalInstance, $scope, $policy) {

                const $ctrl = this;
                $ctrl.policy = $policy;
                $scope.dirty = {};
                $scope.resultsToShow = 5;
                $scope.minCharsToShowSuggestions = 1;
                $scope.editorContent;
                $scope.nrOfLines;
                $scope.showUpload = false;

                // Suggestions dictionary
                let suggestions = ["admin", "admin_required", "rule:admin_required", "rule:service_role", "rule:service_or_admin", "rule:token_subject", "target.credential.user_id", "target.domain.id", "target.domain_id", "target.group.domain_id", "target.limit.domain.id", "target.limit.project.domain_id", "target.limit.project_id", "target:credential.user_id", "target.trust.trustor_user_id", "target.trust.trustee_user_id", "target.user.id", "target.project.domain_id", "target.project.id", "target.role.domain_id", "target.token.user_id", "target.user.domain_id", "token.domain.id", "token.project.domain.id", "role:reader", "role:admin", "and", "or", "rule:owner", "system_scope:all"];

                // Initialize editor line numbers and scroll sync with editor
                $scope.init = function() {
                    $scope.editorContent = formatPolicies();
                    setNumberOfLines();
                    const editor = document.querySelector('.editor-input');
                    const lineNrs = document.querySelector('.editor-line-numbers');
                    editor.onscroll = function(e) {
                        lineNrs.scrollTop = e.target.scrollTop;
                    };
                };

                // Save changes made to policies in editor
                $scope.save = function() {
                    const requests = validateSubmission();
                    $uibModalInstance.close(requests);
                };

                // Discard changes made to policies in editor
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                // Download editor contents as file quick action
                $scope.downloadFile = function() {
                    $actionsDownload.download($scope.editorContent).then(function () {
                        toastService.add('success', gettext('File downloaded successfully'));
                    });
                };

                // Set editor contents from file upload quick action
                $scope.uploadFile = function() {
                    const file = document.getElementById('uploadFile').files[0];
                    $actionsUpload.upload(file).then(function (response) {
                        $scope.editorContent = response;
                        toastService.add('success', gettext('File uploaded successfully'));
                    });
                };

                // Copy editor contents to clipboard quick action
                $scope.clipboardCopy = function() {
                    $actionsCopy.copy($scope.editorContent).then(function () {
                        toastService.add('success', gettext('Text successfully copied to clipboard'));
                    });
                };

                // Print editor contents quick action
                $scope.print = function() {
                    $actionsPrint.print($scope.editorContent).then(function () {
                        toastService.add('success', gettext('Print document successfully created'));
                    });
                }

                // Validate contents of text editor
                function validateSubmission() {
                    const input = $scope.editorContent;
                    const lines = input.split(/\r?\n/);
                    let requests = [];
                    for (let i = 0; i < lines.length; i++) {
                        if(lines[i].indexOf(':') != -1) {
                            const target_string = lines[i].substring(lines[i].indexOf('"'), lines[i].indexOf(':'));
                            const rule_string = lines[i].substring(lines[i].indexOf(':'), lines[i].length);
                            const request_target = target_string.substring(target_string.indexOf('"')+1, target_string.lastIndexOf('"'));
                            const request_rule = rule_string.substring(rule_string.indexOf('"')+1, rule_string.lastIndexOf('"'));
                            for (let j = 0; j < $ctrl.policy.length; j++) {
                                if($ctrl.policy[j].target == request_target) {
                                    const request = {
                                        'project': $ctrl.policy[j].project,
                                        'target': request_target,
                                        'rule': request_rule
                                    }
                                    requests.push(request);
                                }
                            }
                        }
                    }
                    return requests;
                }

                // Set the editor's line numbers range
                function setNumberOfLines() {
                    setTimeout(function() {
                        $scope.nrOfLines = $scope.editorContent.split(/\r?\n/).length+1;
                    }, 10);
                }

                // Get the number of lines in the editor
                function getNumberOfLines() {
                    return $scope.editorContent.split(/\r?\n/).length+1;
                }

                // Update editor's line numbers range
                $scope.editorContentChanged=function() {
                    $scope.nrOfLines = getNumberOfLines();
                }

                // Format selected policies to json format
                function formatPolicies() {
                    let formatted = '{' + '\n';
                    for (let i = 0; i < $ctrl.policy.length; i++) {
                        formatted += "    " + '"' + $ctrl.policy[i].target + '": "' + $ctrl.policy[i].rule + '"';
                        i+1 < $ctrl.policy.length ? formatted += ',' + '\n' : formatted += '\n';
                    }
                    return formatted += '}';
                }

                // Auto complete suggestions functions
                function autocomp_suggestions() {
                    const search_term = get_search_term();
                    if (search_term.length < $scope.minCharsToShowSuggestions) {
                        return;
                    }
                    const search_results = get_search_suggestions(search_term);
                    search_results.forEach(function (search_result) {
                        search_result.value = search_result.value;
                    });
                    return search_results;
                };

                // Get the user's latest input after a delimiter
                function get_search_term() {
                    const textarea = document.querySelector('.editor-textarea');
                    const crtIndex = textarea.selectionStart;
                    const lastDelim = get_last_delimiter_index(textarea.value.substring(0, crtIndex));
                    const lineNr = textarea.value.split(/\r?\n/).length;
                    let term = "";
                    if (lineNr == 1) {
                        term = textarea.value.substring(lastDelim, crtIndex);
                    } else {
                        term = textarea.value.substring(lastDelim+1, crtIndex);
                    }
                    return term;
                }

                // Look up suggestions for string of characters
                function get_search_suggestions(term) {
                    const query = term.toLowerCase().trim();
                    let results = [];
                    for (let i = 0; i < suggestions.length && results.length < $scope.resultsToShow; i++) {
                        let suggestion = suggestions[i];
                        if (suggestion.toLowerCase().indexOf(query) === 0) {
                            results.push({ label: suggestion, value: suggestion });
                        }
                    }
                    return results;
                }

                // Get the position of the last delimiter before the user's input caret in the text editor
                function get_last_delimiter_index(input) {
                    let delimiters = [
                        input.lastIndexOf('\n'),
                        input.lastIndexOf('\t'),
                        input.lastIndexOf('\s'),
                        input.lastIndexOf('"'),
                        input.lastIndexOf('('),
                        input.lastIndexOf(')'),
                        input.lastIndexOf('%'),
                        input.lastIndexOf(':'),
                        input.lastIndexOf(','),
                        input.lastIndexOf('.'),
                        input.lastIndexOf(' ')
                    ]
                    return Math.max(...delimiters);
                }

                // Insert user selected suggestion into the text editor
                function apply_selected_suggestion(selected) {
                    const textarea = document.querySelector('.editor-textarea');
                    const caretIndex = textarea.selectionStart;
                    const lineNr = textarea.value.split(/\r?\n/).length;
                    const lastDelim = get_last_delimiter_index(textarea.value.substring(0, caretIndex));
                    if (lineNr == 1 && lastDelim == -1) {
                        let textAfterCaret = textarea.value.substr(caretIndex, textarea.value.length);
                        textarea.value = selected.value + textAfterCaret;
                        textarea.setSelectionRange(selected.value.length, selected.value.length);
                    } else {
                        let textBeforeCaret = textarea.value.substr(0, lastDelim+1);
                        let textAfterCaret = textarea.value.substr(caretIndex, textarea.value.length);
                        textarea.value = textBeforeCaret + selected.value + textAfterCaret;
                        textarea.setSelectionRange(textBeforeCaret.length + selected.value.length, textBeforeCaret.length + selected.value.length);
                    }
                };

                // Auto complete suggestions binding
                $scope.autocomp_results = {
                    suggest: autocomp_suggestions,
                    on_select: function(selected) {
                        apply_selected_suggestion(selected);
                    }
                };
            }
        ]);
})();
