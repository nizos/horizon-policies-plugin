(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.editor', ['ngSanitize'])
        .controller('EditorController', [
            '$uibModalInstance',
            '$scope',
            '$policy',
            function($uibModalInstance, $scope, $policy) {

                const $ctrl = this;
                $ctrl.policy = $policy;
                $scope.dirty = {};
                $scope.resultsToShow = 5;
                $scope.minCharsToShowSuggestions = 1;
                $scope.editorContent;
                $scope.nrOfLines;

                let suggestions = ["admin", "admin_required", "rule:admin_required", "rule:service_role", "rule:service_or_admin", "rule:token_subject", "target.credential.user_id", "target.domain.id", "target.domain_id", "target.group.domain_id", "target.limit.domain.id", "target.limit.project.domain_id", "target.limit.project_id", "target:credential.user_id", "target.trust.trustor_user_id", "target.trust.trustee_user_id", "target.user.id", "target.project.domain_id", "target.project.id", "target.role.domain_id", "target.token.user_id", "target.user.domain_id", "token.domain.id", "token.project.domain.id", "role:reader", "role:admin", "and", "or", "rule:owner", "system_scope:all"];

                $scope.init = function() {
                    $scope.editorContent = formatPolicies();
                    setNumberOfLines();
                    const editor = document.querySelector('.editor-input');
                    const lineNrs = document.querySelector('.editor-line-numbers');
                    editor.onscroll = function(e) {
                        lineNrs.scrollTop = e.target.scrollTop;
                    };
                };

                // Modal window functions
                $scope.save = function(content) {
                    $uibModalInstance.close(content);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                // Modal window functions
                $scope.save = function(content) {
                    const submission = validateSubmission(content);
                    $uibModalInstance.close(submission);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                function validateSubmission(content) {

                }

                function setNumberOfLines() {
                    setTimeout(function() {
                        $scope.nrOfLines = document.querySelector('.editor-input').value.split(/\r?\n/).length+1;
                    }, 10);
                }

                function getNumberOfLines() {
                    return document.querySelector('.editor-input').value.split(/\r?\n/).length+1;
                }

                $scope.editorContentChanged=function() {
                    $scope.nrOfLines = getNumberOfLines();
                }

                // Policies provider functions
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
                    const search_term = get_search_term(); // What is it that we should show suggestions for?
                    if (search_term.length < $scope.minCharsToShowSuggestions) {
                        return;
                    }
                    const search_results = get_search_suggestions(search_term); // What suggestions do we have for it?
                    search_results.forEach(function (search_result) {
                        search_result.value = search_result.value;
                    });
                    return search_results;
                };

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

                $scope.autocomp_results = {
                    suggest: autocomp_suggestions,
                    on_select: function(selected) {
                        apply_selected_suggestion(selected);
                    }
                };

            }
        ]);

})();
