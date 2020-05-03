(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.lib.autocomp', ['ngSanitize'])
        .provider('autocompConfig', function () {
            const config = this;

            config.KEYS = {
                TAB: 9,
                ESC: 27,
                ENTER: 13,
                UP: 38,
                DOWN: 40
            };

            config.EVENTS = {
                KEYDOWN: 'keydown',
                RESIZE: 'resize',
                BLUR: 'blur'
            };

            config.DEBOUNCE = {
                position: 150,
                attach: 300,
                suggest: 200,
                blur: 150
            };

            config.generate_random_id = function (prefix) {
                return prefix + '_' + Math.random().toString().substring(2);
            };

            function _createForOfIteratorHelper(o) {
                if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
                    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
                        let i = 0;
                        let F = function F() {};
                        return {
                            s: F,
                            n: function n() {
                                if (i >= o.length) return { done: true };
                                return { done: false, value: o[i++] };
                            },
                            e: function e(_e) {
                                throw _e;
                            },
                            f: F
                        };
                    }
                    throw new TypeError(
                        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                    );
                }
                let it,
                    normalCompletion = true,
                    didErr = false,
                    err;
                return {
                    s: function s() {
                        it = o[Symbol.iterator]();
                    },
                    n: function n() {
                        let step = it.next();
                        normalCompletion = step.done;
                        return step;
                    },
                    e: function e(_e2) {
                        didErr = true;
                        err = _e2;
                    },
                    f: function f() {
                        try {
                            if (!normalCompletion && it.return != null) it.return();
                        } finally {
                            if (didErr) throw err;
                        }
                    }
                };
            }

            function _unsupportedIterableToArray(o, minLen) {
                if (!o) {
                    return;
                }
                if (typeof o === 'string') {
                    return _arrayLikeToArray(o, minLen);
                }
                let n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === 'Object' && o.constructor) {
                    n = o.constructor.name;
                }
                if (n === 'Map' || n === 'Set') {
                    return Array.from(o);
                }
                if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
                    return _arrayLikeToArray(o, minLen);
                }
            }

            function _arrayLikeToArray(arr, len) {
                if (len == null || len > arr.length) {
                    len = arr.length;
                }
                for (let i = 0, arr2 = new Array(len); i < len; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            }

            const getCursorXY = function getCursorXY(input, selectionPoint) {
                // create a dummy element that will be a clone of our input
                let inputX = input.offsetLeft;
                let inputY = input.offsetTop;
                // get the computed style of the input and clone it onto the dummy element
                let div = document.createElement('div');
                let copyStyle = getComputedStyle(input);
                let _iterator = _createForOfIteratorHelper(copyStyle);
                let _step;
                try {
                    // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        let prop = _step.value;
                        div.style[prop] = copyStyle[prop];
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
                // set the div content to that of the textarea up until selection
                let inputValue = input.value;
                // set the text content of the dummy element div
                let textContent = inputValue.substr(0, selectionPoint);
                div.textContent = textContent;
                div.style.height = 'auto';
                // create a marker element to obtain caret position
                let span = document.createElement('span');
                // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
                span.textContent = inputValue.substr(selectionPoint) || '.';
                // append the span marker to the div
                div.appendChild(span);
                // append the dummy element to the body
                document.body.appendChild(div);
                // get the marker position, this is the caret position top and left relative to the input
                let spanX = span.offsetLeft;
                let spanY = span.offsetTop;
                // lastly, remove that dummy element
                document.body.removeChild(div);
                // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
                return {
                    x: inputX + spanX,
                    y: inputY + spanY
                };
            };


            // Position ac container given a target element
            config.position_autocomplete = function (container, target) {
                if (typeof target !== 'undefined') {
                    let input = document.querySelector('.editor-textarea');
                    let selectionEnd = input.selectionStart;
                    // grab the properties from the input that we are interested in
                    let offsetLeft = input.offsetLeft;
                    let offsetTop = input.offsetTop;
                    let offsetHeight = input.offsetHeight;
                    let offsetWidth = input.offsetWidth;
                    let scrollLeft = input.scrollLeft;
                    let scrollTop = input.scrollTop;
                    // get style property values that we are interested in
                    let _getComputedStyle = getComputedStyle(input);
                    let lineHeight = _getComputedStyle.lineHeight;
                    let paddingRight = _getComputedStyle.paddingRight;
                    let _getCursorXY = getCursorXY(input, selectionEnd);
                    let x = _getCursorXY.x;
                    let y = _getCursorXY.y;
                    container[0].style.top = Math.min(y - scrollTop, offsetTop + offsetHeight - parseInt(lineHeight, 10)) + 'px';
                    container[0].style.left = Math.min(x - scrollLeft, offsetLeft + offsetWidth - parseInt(paddingRight, 10)) + 'px';
                }
            };

            config.CLASSES = {
                container: 'ac-container',
                menu: 'ac-menu',
                menu_item: 'ac-menu-item',
                menu_item_focus: 'ac-state-focus'
            };

            this.$get = function () {
                return config;
            };
        })
        .directive('autocomp', [
            'autocompConfig', '$timeout', '$window', '$document', '$q',
            function (config, $timeout, $window, $document, $q) {
                return {
                    restrict: 'A',
                    scope: {
                        options: '&autocomp'
                    },
                    transclude: true,
                    template:
                        '<span ng-transclude></span>' +
                        '<div class="' + config.CLASSES.container + '" aria-autocomplete="list" role="listbox" ng-show="show_autocomplete">' +
                            '<ul class="' + config.CLASSES.menu + '"> ' +
                                '<li ng-repeat="result in results" ng-if="$index > 0"  class="' + config.CLASSES.menu_item + '"  role="option" ' +
                                'id="{{result.id}}"  ng-class="$index == selected_index ? \'' + config.CLASSES.menu_item_focus + '\': \'\'">' +
                                    '<a href ng-click="apply_selection($index)" ng-bind-html="result.label"></a>' +
                                '</li>' +
                            '</ul>' +
                        '</div>',

                    link: function (scope, element) {
                        scope.container = angular.element(element[0].getElementsByClassName('ac-container')[0]);
                        scope.container[0].style.position = 'absolute';
                    },

                    controller: ['$scope', function ($scope) {
                        const that = this;

                        let bound_events = {};
                        bound_events[config.EVENTS.BLUR] = null;
                        bound_events[config.EVENTS.KEYDOWN] = null;
                        bound_events[config.EVENTS.RESIZE] = null;

                        let _user_options = $scope.options() || {};
                        let user_options = {
                            debounce_position: _user_options.debounce_position || config.DEBOUNCE.position,
                            debounce_attach: _user_options.debounce_attach || config.DEBOUNCE.attach,
                            debounce_suggest: _user_options.debounce_suggest || config.DEBOUNCE.suggest,
                            debounce_blur: _user_options.debounce_blur || config.DEBOUNCE.blur
                        };

                        let current_element,
                            current_model,
                            current_options,
                            previous_value,
                            value_watch,
                            last_selected_value,
                            current_element_random_id_set;

                        $scope.show_autocomplete = false;

                        function show_autocomplete() {
                            $scope.show_autocomplete = true;
                        }

                        function hide_autocomplete() {
                            $scope.show_autocomplete = false;
                            clear_selection();
                        }

                        // Debounce - taken from underscore.
                        function debounce(func, wait, immediate) {
                            let timeoutPromise;
                            return function () {
                                let context = this, args = arguments;
                                let later = function () {
                                    timeoutPromise = null;
                                    if (!immediate) {
                                        func.apply(context, args);
                                    }
                                };
                                let callNow = immediate && !timeoutPromise;
                                $timeout.cancel(timeoutPromise);
                                timeoutPromise = $timeout(later, wait);
                                if (callNow) {
                                    func.apply(context, args);
                                }
                            };
                        }

                        // Make sure an element has id.
                        // Return true if id was generated.
                        function ensure_element_id(element) {
                            if (!element.id || element.id === '') {
                                element.id = config.generate_random_id('ac_element');
                                return true;
                            }
                            return false;
                        }

                        function _position_autocomplete() {
                            config.position_autocomplete($scope.container, current_element);
                        }

                        let position_autocomplete = debounce(_position_autocomplete, user_options.debounce_position);

                        function _suggest(term, target_element) {
                            $scope.selected_index = 0;
                            $scope.waiting_for_suggestion = true;

                            if (typeof (term) === 'string' && term.length > 0) {
                                $q.when(current_options.suggest(term),
                                    function suggest_succeeded(suggestions) {
                                        // Make sure the suggestion we are processing is of the current element.
                                        // When using remote sources for example, a suggestion cycle might be
                                        // triggered at a later time (When a different field is in focus).
                                        if (!current_element || current_element !== target_element) {
                                            return;
                                        }

                                        if (suggestions && suggestions.length > 0) {
                                            // Set unique id to each suggestion so we can
                                            // reference them (aria)
                                            suggestions.forEach(function (s) {
                                                if (!s.id) {
                                                    s.id = config.generate_random_id('ac_item');
                                                }
                                            });
                                            // Add the original term as the first value to enable the user
                                            // to return to his original expression after suggestions were made.
                                            $scope.results = [{ value: term, label: '', id: '' }].concat(suggestions);
                                            show_autocomplete();
                                            if (current_options.auto_select_first) {
                                                set_selection(1);
                                            }
                                        } else {
                                            $scope.results = [];
                                            hide_autocomplete();
                                        }
                                    },
                                    function suggest_failed(error) {
                                        hide_autocomplete();
                                        if (current_options.on_error) {
                                            current_options.on_error(error);
                                        }
                                    }
                                ).finally(function suggest_finally() {
                                    $scope.waiting_for_suggestion = false;
                                });
                            } else {
                                $scope.waiting_for_suggestion = false;
                                hide_autocomplete();
                                $scope.$apply();
                            }
                        }
                        let suggest = debounce(_suggest, user_options.debounce_suggest);

                        // Attach autocomplete behavior to an input element.
                        function _attach(ngmodel, target_element, options) {
                            // Element is already attached.
                            if (current_element === target_element) {
                                return;
                            }

                            // Safe: clear previously attached elements.
                            if (current_element) {
                                that.detach();
                            }

                            // The element is still the active element.
                            if (target_element[0] !== $document[0].activeElement) {
                                return;
                            }

                            if (options.on_attach) {
                                options.on_attach();
                            }

                            current_element = target_element;
                            current_model = ngmodel;
                            current_options = options;
                            previous_value = ngmodel.$viewValue;
                            current_element_random_id_set = ensure_element_id(target_element);
                            $scope.container[0].setAttribute('aria-labelledby', current_element.id);

                            $scope.results = [];
                            $scope.selected_index = -1;
                            bind_element();

                            value_watch = $scope.$watch(
                                function () {
                                    return ngmodel.$modelValue;
                                },
                                function (nv) {
                                    // Prevent suggestion cycle when the value is the last value selected.
                                    // When selecting from the menu the ng-model is updated and this watch
                                    // is triggered. This causes another suggestion cycle that will provide as
                                    // suggestion the value that is currently selected - this is unnecessary.
                                    if (nv === last_selected_value) {
                                        return;
                                    }

                                    _position_autocomplete();
                                    suggest(nv, current_element);
                                }
                            );
                        }
                        that.attach = debounce(_attach, user_options.debounce_attach);

                        // Trigger end of editing and remove all attachments made by
                        // this directive to the input element.
                        that.detach = function () {
                            if (current_element) {
                                let value = current_element.val();
                                update_model_value(value);
                                if (current_options.on_detach) {
                                    current_options.on_detach(value);
                                }
                                current_element.unbind(config.EVENTS.KEYDOWN, bound_events[config.EVENTS.KEYDOWN]);
                                current_element.unbind(config.EVENTS.BLUR, bound_events[config.EVENTS.BLUR]);
                                if (current_element_random_id_set) {
                                    current_element[0].removeAttribute('id');
                                }
                            }
                            hide_autocomplete();
                            $scope.container[0].removeAttribute('aria-labelledby');
                            // Clear references and config.events.
                            angular.element($window).unbind(config.EVENTS.RESIZE, bound_events[config.EVENTS.RESIZE]);
                            if (value_watch) {
                                value_watch();
                            }
                            $scope.selected_index = $scope.results = undefined;
                            current_model = current_element = previous_value = undefined;
                        };

                        // Update angular's model view value.
                        // It is important that before triggering hooks the model's view
                        // value will be synced with the visible value to the user. This will
                        // allow the consumer controller to rely on its local ng-model.
                        function update_model_value(value) {
                            if (current_model.$modelValue !== value) {
                                // current_model.$setViewValue(value);
                                current_model.$render();
                            }
                        }

                        function clear_selection() {
                            $scope.selected_index = -1;
                            $scope.container[0].removeAttribute('aria-activedescendant');
                            last_selected_value = undefined;
                        }

                        // Set the current selection while navigating through the menu.
                        function set_selection(i) {
                            // We use value instead of setting the model's view value
                            // because we watch the model value and setting it will trigger
                            // a new suggestion cycle.
                            let selected = $scope.results[i];
                            // current_element.val(selected.value); // Stops the textarea value from changing while navigating menu
                            $scope.selected_index = i;
                            $scope.container[0].setAttribute('aria-activedescendant', selected.id);
                            return selected;
                        }

                        // Apply and accept the current selection made from the menu.
                        // When selecting from the menu directly (using click or touch) the
                        // selection is directly applied.
                        $scope.apply_selection = function (i) {
                            current_element[0].focus();
                            if (!$scope.show_autocomplete || i > $scope.results.length || i < 0) {
                                return;
                            }

                            let selected = set_selection(i);
                            last_selected_value = selected.value;
                            // update_model_value(selected.value); // Commenting out stops the text area value from being trimmed of space on first line
                            hide_autocomplete();

                            if (current_options.on_select) {
                                current_options.on_select(selected);
                            }
                        };

                        function bind_element() {
                            angular.element($window).bind(config.EVENTS.RESIZE, position_autocomplete);

                            bound_events[config.EVENTS.BLUR] = function () {
                                // Detach the element from the auto complete when input loses focus.
                                // Focus is lost when a selection is made from the auto complete menu
                                // using the mouse (or touch). In that case we don't want to detach so
                                // we wait several ms for the input to regain focus.
                                $timeout(function () {
                                    if (!current_element || current_element[0] !== $document[0].activeElement) {
                                        that.detach();
                                    }
                                }, user_options.debounce_blur);
                            };
                            current_element.bind(config.EVENTS.BLUR, bound_events[config.EVENTS.BLUR]);

                            bound_events[config.EVENTS.KEYDOWN] = function (e) {
                                // Reserve key combinations with shift for different purposes.
                                if (e.shiftKey) {
                                    return;
                                }

                                switch (e.keyCode) {
                                    // Close the menu if it's open. Or, undo changes made to the value
                                    // if the menu is closed.
                                    case config.KEYS.ESC:
                                        if ($scope.show_autocomplete) {
                                            hide_autocomplete();
                                            $scope.$apply();
                                        } else {
                                            current_element.val(previous_value);
                                        }
                                        break;

                                    // Select an element and close the menu. Or, if a selection is
                                    // unavailable let the event propagate.
                                    case config.KEYS.ENTER:
                                        // Accept a selection only if results exist, the menu is
                                        // displayed and the results are valid (no current request
                                        // for new suggestions is active).
                                        if ($scope.show_autocomplete &&
                                            $scope.selected_index > 0 &&
                                            !$scope.waiting_for_suggestion) {
                                            $scope.apply_selection($scope.selected_index);
                                            // When selecting an item from the AC list the focus is set on
                                            // the input element. So the enter will cause a keypress event
                                            // on the input itself. Since this enter is not intended for the
                                            // input but for the AC result we prevent propagation to parent
                                            // elements because this event is not of their concern. We cannot
                                            // prevent events from firing when the event was registered on
                                            // the input itself.
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }

                                        hide_autocomplete();
                                        $scope.$apply();
                                        break;

                                    // Navigate the menu when it's open. When it's not open fall back
                                    // to default behavior.
                                    case config.KEYS.TAB:
                                            e.preventDefault();
                                            let s = this.selectionStart;
                                            this.value = this.value.substring(0,this.selectionStart) + "    " + this.value.substring(this.selectionEnd);
                                            this.selectionEnd = s+4;
                                            $scope.$apply();
                                            break;

                                    // Open the menu when results exists but are not displayed. Or,
                                    // select the next element when the menu is open. When reaching
                                    // bottom wrap to top.
                                    /* falls through */
                                    case config.KEYS.DOWN:
                                        if ($scope.results.length > 0) {
                                            if ($scope.show_autocomplete) {
                                                e.preventDefault();
                                                set_selection($scope.selected_index + 1 > $scope.results.length - 1 ? 0 : $scope.selected_index + 1);
                                            } else {
                                                show_autocomplete();
                                                set_selection(0);
                                            }
                                            $scope.$apply();
                                        }
                                        break;

                                    // Navigate up in the menu. When reaching the top wrap to bottom.
                                    case config.KEYS.UP:
                                        if ($scope.show_autocomplete) {
                                            e.preventDefault();
                                            set_selection($scope.selected_index - 1 >= 0 ? $scope.selected_index - 1 : $scope.results.length - 1);
                                            $scope.$apply();
                                        }
                                        break;
                                }
                            };
                            current_element.bind(config.EVENTS.KEYDOWN, bound_events[config.EVENTS.KEYDOWN]);
                        }

                        $scope.$on('$destroy', function () {
                            that.detach();
                            $scope.container.remove();
                        });
                    }]
                };
            }
        ])

        .directive('autocompItem',
            function () {
                return {
                    restrict: 'A',
                    require: [
                        '^autocomp',
                        'ngModel'
                    ],
                    scope: {
                        'autocompItem': '&'
                    },
                    link: function (scope, element, attrs, required) {
                        // Prevent html5/browser auto completion.
                        attrs.$set('autocomplete', 'off');

                        let acContainer = required[0];
                        let ngModel = required[1];

                        element.bind('focus', function () {
                            let options = scope.autocompItem();
                            if (!options) {
                                throw new Error('Invalid options');
                            }
                            acContainer.attach(ngModel, element, options);
                        });
                    }
                }
            }
        )

})();
