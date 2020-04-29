(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.details', ['ngSanitize'])
        .controller('detailsController', [
            '$uibModalInstance',
            '$scope',
            '$policy',
            function($uibModalInstance, $scope, $policy) {

                var $ctrl = this;
                $ctrl.policy = $policy;
                $scope.dirty = {};
                $scope.resultsToShow = 5;

                var suggestions = ["admin", "admin_required", "rule:admin_required", "rule:service_role", "rule:service_or_admin", "rule:token_subject", "target.credential.user_id", "target.domain.id", "target.domain_id", "target.group.domain_id", "target.limit.domain.id", "target.limit.project.domain_id", "target.limit.project_id", "target:credential.user_id", "target.trust.trustor_user_id", "target.trust.trustee_user_id", "target.user.id", "target.project.domain_id", "target.project.id", "target.role.domain_id", "target.token.user_id", "target.user.domain_id", "token.domain.id", "token.project.domain.id", "role:reader", "role:admin", "and", "or", "rule:owner", "system_scope:all"];

                $scope.ok = function(policy) {
                    $uibModalInstance.close(policy);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                $scope.textAreaContent=function() {
                    var json_format = '{' + '\n';
                    for (var i = 0; i < $ctrl.policy.length; i++) {
                        json_format += "    " + '"' + $ctrl.policy[i].target + '": "' + $ctrl.policy[i].rule + '"';
                        i+1 < $ctrl.policy.length ? json_format += ',' + '\n' : json_format += '\n';
                        console.log("i+1 = ", i+1);
                        console.log("$ctrl.policy.length = ", $ctrl.policy.length);
                    }
                    json_format += '}';
                    console.log("content: ", json_format);
                    return json_format;
                }

                function autocomp_suggestions() {
                    var search_term = get_search_term(); // What is it that we should show suggestions for?
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

                    if (lineNr == 1) {
                        return textarea.value.substring(lastDelim, crtIndex); // word to use for suggestion is from last delimiter to the caret
                    } else {
                        return textarea.value.substring(lastDelim+1, crtIndex); // word to use for suggestion is from last delimiter plus 1 character to the caret
                    }
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
