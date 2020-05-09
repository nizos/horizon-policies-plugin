angular.module('horizon.dashboard.identity.policy.lib.clipboard', [])
        .controller('CopyToClipboardController', function () {

        })
        .provider('$copyToClipboard', [function () {

            this.$get = ['$q', '$window', function ($q, $window) {
                var body = angular.element($window.document.body);
                var textarea = angular.element('<textarea/>');
                textarea.css({
                    position: 'fixed',
                    opacity: '0'
                });
                return {
                    copy: function (stringToCopy) {
                        var deferred = $q.defer();
                        deferred.notify("copying the text to clipboard");
                        textarea.val(stringToCopy);
                        body.append(textarea);
                        textarea[0].select();

                        try {
                            var successful = $window.document.execCommand('copy');
                            if (!successful) throw successful;
                            deferred.resolve(successful);
                        } catch (err) {
                            deferred.reject(err);
                            //window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
                        } finally {
                            textarea.remove();
                        }
                        return deferred.promise;
                    }
                };
            }];
    }]);