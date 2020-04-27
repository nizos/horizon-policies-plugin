(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.details', ['ngSanitize'])
        .controller('detailsController', [
            '$uibModalInstance',
            '$log',
            '$scope',
            '$policy',
            function($uibModalInstance, $log, $scope, $policy) {

                var $ctrl = this;
                $ctrl.policy = $policy;
                $scope.dirty = {};
                $scope.resultsToShow = 5;

                var suggestions = ["admin", "admin_required", "rule:admin_required", "rule:service_role", "rule:service_or_admin", "rule:token_subject", "target.credential.user_id", "target.domain.id", "target.domain_id", "target.group.domain_id", "target.limit.domain.id", "target.limit.project.domain_id", "target.limit.project_id", "target.trust.trustor_user_id", "target.trust.trustee_user_id", "target.project.domain_id", "target.project.id", "target.role.domain_id", "target.token.user_id", "target.user.id", "target.user.domain_id", "token.domain.id", "token.project.domain.id"];

                $scope.ok = function(policy) {
                    $uibModalInstance.close(policy);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }

                function autocomp_suggestions(term) {
                    var search_term = get_search_term();
                    var search_results = get_search_suggestions(search_term);
                    search_results.forEach(function (search_result) {
                        search_result.value = search_result.value;
                    });
                    return search_results;
                };

                function get_search_term() {
                    var textarea = document.getElementsByClassName("autocomp")[0];
                    var crtIndex = textarea.selectionStart;
                    var lastDelim = get_last_delimiter_index(textarea.value.substring(0, crtIndex));
                    var lineNr = textarea.value.substr(0, crtIndex).split('\n').length;
                    if (lineNr == 1) {
                        return textarea.value.substring(lastDelim, crtIndex);
                    } else {
                        return textarea.value.substring(lastDelim+1, crtIndex);
                    }
                }

                function get_search_suggestions(term) {
                    var query = term.toLowerCase().trim();
                    var results = [];

                    for (var i = 0; i < suggestions.length && results.length < $scope.resultsToShow; i++) {
                        var suggestion = suggestions[i];
                        if (suggestion.toLowerCase().indexOf(query) === 0) {
                            results.push({ label: suggestion, value: suggestion });
                        }
                    }
                    return results;
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
