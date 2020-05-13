/*
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
    'use strict';

    angular
        .module('horizon.dashboard.identity.policy.policies.components.policies-editor.editor-autocomplete')
        .provider('autocompleteConfig', function () {
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

})();




