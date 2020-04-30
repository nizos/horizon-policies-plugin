(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.editor', ['ngSanitize'])
        .controller('EditorController', [
            '$uibModalInstance',
            '$scope',
            '$policy',
            function($uibModalInstance, $scope, $policy) {

                var $ctrl = this;
                // policies scopes
                $ctrl.policy = $policy;
                $scope.dirty = {};
                // Number of suggestions to show scope
                $scope.resultsToShow = 5;
                $scope.minCharsToShowSuggestions = 2;
                // Auto complete suggestions scope
                var suggestions = ["admin", "admin_required", "rule:admin_required", "rule:service_role", "rule:service_or_admin", "rule:token_subject", "target.credential.user_id", "target.domain.id", "target.domain_id", "target.group.domain_id", "target.limit.domain.id", "target.limit.project.domain_id", "target.limit.project_id", "target:credential.user_id", "target.trust.trustor_user_id", "target.trust.trustee_user_id", "target.user.id", "target.project.domain_id", "target.project.id", "target.role.domain_id", "target.token.user_id", "target.user.domain_id", "token.domain.id", "token.project.domain.id", "role:reader", "role:admin", "and", "or", "rule:owner", "system_scope:all"];

                $scope.editorContent = formatPolicies();
                $scope.nrOfLines = 3;
                $scope.editorHeight = {};

                // Modal window functions
                $scope.save = function(content) {
                    var submission = validateSubmission(content);
                    $uibModalInstance.close(submission);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                function validateSubmission(content) {

                }

                function getNumberOfLines() {
                    var editor = document.getElementsByClassName("autocomp")[0];
                    return editor.value.substr(0, editor.value.length).split('\n').length;
                }

                function updateNumberOfLines() {
                    $scope.nrOfLines = getNumberOfLines()+1;
                }

                function updateEditorHeight() {
                    var newHeight = ($scope.nrOfLines*13)+27;
                    $scope.editorHeight = {
                        'height': newHeight+'px'
                    };
                }


                $scope.editorInit=function() {
                    $scope.editorContent = formatPolicies();
                    updateNumberOfLines();
                    updateEditorHeight();
                    console.log('page loading completed');
                }

                $scope.editorContentChanged=function() {
                    updateNumberOfLines();
                    updateEditorHeight();
                }

                // Policies provider functions
                function formatPolicies() {
                    var formatted = '{' + '\n';
                    for (var i = 0; i < $ctrl.policy.length; i++) {
                        formatted += "    " + '"' + $ctrl.policy[i].target + '": "' + $ctrl.policy[i].rule + '"';
                        i+1 < $ctrl.policy.length ? formatted += ',' + '\n' : formatted += '\n';
                    }
                    return formatted += '}';
                }

                // Auto complete suggestions functions
                function autocomp_suggestions() {
                    var search_term = get_search_term(); // What is it that we should show suggestions for?
                    if (search_term.length < $scope.minCharsToShowSuggestions) {
                        return;
                    }
                    var search_results = get_search_suggestions(search_term); // What suggestions do we have for it?
                    search_results.forEach(function (search_result) {
                        search_result.value = search_result.value;
                    });
                    return search_results;
                };

                function get_search_term() { // Get the word to use for looking up the suggestions to provide
                    var textarea = document.getElementsByClassName("autocomp")[0]; // get text are from html
                    var crtIndex = textarea.selectionStart; // get keyboard caret position in the text area
                    var lastDelim = get_last_delimiter_index(textarea.value.substring(0, crtIndex)); // get the position of last delimiter in the textarea before the caret
                    var lineNr = textarea.value.substr(0, crtIndex).split('\n').length; // get the line number where the caret is in the text area
                    var term = "";
                    if (lineNr == 1) {
                        term = textarea.value.substring(lastDelim, crtIndex); // word to use for suggestion is from last delimiter to the caret
                    } else {
                        term = textarea.value.substring(lastDelim+1, crtIndex); // word to use for suggestion is from last delimiter plus 1 character to the caret
                    }
                    return term;
                }

                function get_search_suggestions(term) { // Get available suggestions for the provided word or characters
                    var query = term.toLowerCase().trim(); // make all characters lower case and trim white space before and after it
                    var results = []; // Create an array to store suggestions matching provided term

                    for (var i = 0; i < suggestions.length && results.length < $scope.resultsToShow; i++) {
                        // loops from 0 until it finds results matching the set number of suggestions to show or until it reaches the end of suggestions
                        var suggestion = suggestions[i]; // Save current i in suggestions as a suggestion variable
                        if (suggestion.toLowerCase().indexOf(query) === 0) { // If the suggestion starts with the full search term
                            // suggestion.indexOf(query) looks up where the query word exists in the string suggestion
                            // if the query characters exist at the start of the string (at index 0) then it will return its position which is 0
                            // If query is found in the suggestion string but not at the start, it will also return the position of where the query characters
                            // appear which could be 1, 2, 3...
                            // If the suggestions string does not contain the query characters, it will return -1.
                            // To conclude, 0 indicated that the query string exists at the start of the suggestion string.
                            results.push({ label: suggestion, value: suggestion }); // Add it to our results array
                        }
                    }
                    return results; // return the list of suggestions for the search term
                }

                function get_last_delimiter_index(input) {
                    var delimiters = [
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
                    var textarea = document.getElementsByClassName("autocomp")[0];
                    var caretIndex = textarea.selectionStart;
                    var lineNr = textarea.value.substr(0, caretIndex).split('\n').length;
                    var lastDelim = get_last_delimiter_index(textarea.value.substring(0, caretIndex));
                    if (lineNr == 1 && lastDelim == -1) {
                        var textAfterCaret = textarea.value.substr(caretIndex, textarea.value.length);
                        textarea.value = selected.value + textAfterCaret;
                        textarea.setSelectionRange(selected.value.length, selected.value.length);
                    } else {
                        var textBeforeCaret = textarea.value.substr(0, lastDelim+1);
                        var textAfterCaret = textarea.value.substr(caretIndex, textarea.value.length);
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
