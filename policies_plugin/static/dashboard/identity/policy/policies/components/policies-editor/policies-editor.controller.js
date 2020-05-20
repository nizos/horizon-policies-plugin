(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-editor')
        .controller('EditorController', EditorController);

    EditorController.$inject = [
        'horizon.dashboard.identity.policy.model.policies-model',
        '$actionsCopy',
        '$actionsUpload',
        '$actionsDownload',
        '$actionsPrint',
        '$actionsStorage',
        '$uibModalInstance',
        '$policy'
    ];

    function EditorController(PoliciesModel, $actionsCopy, $actionsUpload, $actionsDownload, $actionsPrint, $actionsStorage, $uibModalInstance, $policy) {

        let $edtCtrl = this;
        $edtCtrl.policy = $policy;
        $edtCtrl.dirty = {};
        $edtCtrl.resultsToShow = 5;
        $edtCtrl.minCharsToShowSuggestions = 1;
        $edtCtrl.editorContent;
        $edtCtrl.nrOfLines;
        $edtCtrl.showUpload = false;
        $edtCtrl.historyIndex = 0;
        $edtCtrl.history = [];
        $edtCtrl.showSuggestions;
        $edtCtrl.showRuler;

        // Suggestions dictionary
        let suggestions = ["admin", "admin_required", "rule:admin_required", "rule:service_role", "rule:service_or_admin", "rule:token_subject", "target.credential.user_id", "target.domain.id", "target.domain_id", "target.group.domain_id", "target.limit.domain.id", "target.limit.project.domain_id", "target.limit.project_id", "target:credential.user_id", "target.trust.trustor_user_id", "target.trust.trustee_user_id", "target.user.id", "target.project.domain_id", "target.project.id", "target.role.domain_id", "target.token.user_id", "target.user.domain_id", "token.domain.id", "token.project.domain.id", "role:reader", "role:admin", "and", "or", "rule:owner", "system_scope:all"];

        // Initialize editor line numbers and scroll sync with editor
        $edtCtrl.init = function() {
            $edtCtrl.editorContent = formatPolicies();
            setNumberOfLines();
            $actionsStorage.restoreRulerVisible().then(function() {
                $edtCtrl.showRuler = PoliciesModel.data.rulerVisible;
            });
            $actionsStorage.restoreSuggestionsVisible().then(function() {
                $edtCtrl.showSuggestions = PoliciesModel.data.suggestionsVisible;
            });
            const editor = document.querySelector('.editor-input');
            const lineNrs = document.querySelector('.editor-line-numbers');
            editor.onscroll = function(e) {
                lineNrs.scrollTop = e.target.scrollTop;
            };
        };

        // Undo changes made to policies in editor
        $edtCtrl.undo = function() {
            if ($edtCtrl.historyIndex >= 1) {
                $edtCtrl.historyIndex--;
                document.querySelector('.editor-textarea').value = $edtCtrl.history[$edtCtrl.historyIndex];
            };
        };

        // Redo changes made to policies in editor
        $edtCtrl.redo = function() {
            if ($edtCtrl.historyIndex < $edtCtrl.history.length-1) {
                $edtCtrl.historyIndex++;
                document.querySelector('.editor-textarea').value = $edtCtrl.history[$edtCtrl.historyIndex];
            };
        };

        // Copy editor's contents to clipboard
        $edtCtrl.clipboardCopy = function() {
            $actionsCopy.copyContents($edtCtrl.editorContent);
        };

        // Paste clipboard's content into text editor
        $edtCtrl.clipboardPaste = function() {
        };

        // Copy editor's contents to clipboard
        $edtCtrl.toggleRulerVisibility = function() {
            $actionsStorage.storeRulerVisible($edtCtrl.showRuler);
        };

        // Copy editor's contents to clipboard
        $edtCtrl.toggleSuggestionsVisibility = function() {
            $actionsStorage.storeSuggestionsVisible($edtCtrl.showSuggestions);
        };

        // Download editor's contents
        $edtCtrl.downloadFile = function() {
            $actionsDownload.downloadContents($edtCtrl.editorContent);
        };

        // Set editor's contents from uploaded file's
        $edtCtrl.uploadFile = function() {
            let file = document.getElementById('uploadFile').files[0];
            if(!file) {
                file = document.getElementById('responsiveUploadFile').files[0];
            };
            $actionsUpload.upload(file).then(function (response) {
                $edtCtrl.editorContent = response;
            });
        };

        // Print editor's contents
        $edtCtrl.print = function() {
            $actionsPrint.printContents($edtCtrl.editorContent);
        };

        // Discard changes made to policies in editor
        $edtCtrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        // Save changes made to policies in editor
        $edtCtrl.save = function() {
            const requests = validateSubmission();
            $uibModalInstance.close(requests);
        };

        // Validate contents of text editor
        function validateSubmission() {
            const input = $edtCtrl.editorContent;
            const lines = input.split(/\r?\n/);
            let requests = [];
            for (let i = 0; i < lines.length; i++) {
                if(lines[i].indexOf(':') != -1) {
                    const target_string = lines[i].substring(lines[i].indexOf('"'), lines[i].indexOf(':'));
                    const rule_string = lines[i].substring(lines[i].indexOf(':'), lines[i].length);
                    const request_target = target_string.substring(target_string.indexOf('"')+1, target_string.lastIndexOf('"'));
                    const request_rule = rule_string.substring(rule_string.indexOf('"')+1, rule_string.lastIndexOf('"'));
                    for (let j = 0; j < $edtCtrl.policy.length; j++) {
                        if($edtCtrl.policy[j].target == request_target) {
                            const request = {
                                'project': $edtCtrl.policy[j].project,
                                'target': request_target,
                                'rule': request_rule
                            };
                            requests.push(request);
                        };
                    };
                };
            };
            return requests;
        };

        // Set the editor's line numbers range
        function setNumberOfLines() {
            setTimeout(function() {
                $edtCtrl.nrOfLines = $edtCtrl.editorContent.split(/\r?\n/).length+1;
            }, 10);
        };

        // Get the number of lines in the editor
        function getNumberOfLines() {
            return $edtCtrl.editorContent.split(/\r?\n/).length+1;
        };

        // Update editor's line numbers range
        $edtCtrl.editorContentChanged=function() {
            $edtCtrl.nrOfLines = getNumberOfLines();
        };

        // Format selected policies to json format
        function formatPolicies() {
            let formatted = '{' + '\n';
            for (let i = 0; i < $edtCtrl.policy.length; i++) {
                formatted += "    " + '"' + $edtCtrl.policy[i].target + '": "' + $edtCtrl.policy[i].rule + '"';
                i+1 < $edtCtrl.policy.length ? formatted += ',' + '\n' : formatted += '\n';
            };
            return formatted += '}';
        };

        // Auto complete suggestions functions
        function autocompSuggestions() {
            const search_term = getSearchTerm();
            if (search_term === '') {
                $edtCtrl.history.push(document.querySelector('.editor-textarea').value);
                $edtCtrl.historyIndex = $edtCtrl.history.length;
            };
            if (search_term.length < $edtCtrl.minCharsToShowSuggestions || !$edtCtrl.showSuggestions) {
                return;
            };
            const search_results = getSearchSuggestions(search_term);
            search_results.forEach(function (search_result) {
                search_result.value = search_result.value;
            });
            return search_results;
        };

        // Get the user's latest input after a delimiter
        function getSearchTerm() {
            const textarea = document.querySelector('.editor-textarea');
            const crtIndex = textarea.selectionStart;
            const lastDelim = getLastDelimiterIndex(textarea.value.substring(0, crtIndex));
            const lineNr = textarea.value.split(/\r?\n/).length;
            let term = "";
            if (lineNr == 1) {
                term = textarea.value.substring(lastDelim, crtIndex);
            } else {
                term = textarea.value.substring(lastDelim+1, crtIndex);
            };
            return term;
        };

        // Look up suggestions for string of characters
        function getSearchSuggestions(term) {
            const query = term.toLowerCase().trim();
            let results = [];
            for (let i = 0; i < suggestions.length && results.length < $edtCtrl.resultsToShow; i++) {
                let suggestion = suggestions[i];
                if (suggestion.toLowerCase().indexOf(query) === 0) {
                    results.push({ label: suggestion, value: suggestion });
                };
            };
            return results;
        };

        // Get the position of the last delimiter before the user's input caret in the text editor
        function getLastDelimiterIndex(input) {
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
            ];
            return Math.max(...delimiters);
        };

        // Insert user selected suggestion into the text editor
        function applySelectedSuggestion(selected) {
            const textarea = document.querySelector('.editor-textarea');
            const caretIndex = textarea.selectionStart;
            const lineNr = textarea.value.split(/\r?\n/).length;
            const lastDelim = getLastDelimiterIndex(textarea.value.substring(0, caretIndex));
            if (lineNr == 1 && lastDelim == -1) {
                let textAfterCaret = textarea.value.substr(caretIndex, textarea.value.length);
                textarea.value = selected.value + textAfterCaret;
                textarea.setSelectionRange(selected.value.length, selected.value.length);
            } else {
                let textBeforeCaret = textarea.value.substr(0, lastDelim+1);
                let textAfterCaret = textarea.value.substr(caretIndex, textarea.value.length);
                textarea.value = textBeforeCaret + selected.value + textAfterCaret;
                textarea.setSelectionRange(textBeforeCaret.length + selected.value.length, textBeforeCaret.length + selected.value.length);
            };
        };

        // Auto complete suggestions binding
        $edtCtrl.autocompResults = {
            suggest: autocompSuggestions,
            on_select: function(selected) {
                applySelectedSuggestion(selected);
            }
        };
    };

})();
