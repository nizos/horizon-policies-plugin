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
        .module('horizon.dashboard.identity.policy.actions.context-menu')
        .directive('contextMenu', [
            'ContextMenuService',
            'ContextMenuEvents',
            '$rootScope',
            '$parse',
            '$q',
            '$sce',
            '$document',
            '$window',
            '$compile',
            function (ContextMenuService, ContextMenuEvents, $rootScope, $parse, $q, $sce, $document, $window, $compile) {

                let _contextMenus = [];
                // Contains the element that was clicked to show the context menu
                let _clickedElement = null;
                let DEFAULT_ITEM_TEXT = '"New Item';
                let _emptyText = 'empty';

                function createAndAddOptionText(params) {
                    // Destructuring:
                    let $scope = params.$scope;
                    let item = params.item;
                    let event = params.event;
                    let modelValue = params.modelValue;
                    let $promises = params.$promises;
                    let nestedMenu = params.nestedMenu;
                    let $li = params.$li;
                    let leftOriented = String(params.orientation).toLowerCase() === 'left';

                    let optionText = null;

                    if (item.html) {
                        if (angular.isFunction(item.html)) {
                            // runs the function that expects a jQuery/jqLite element
                            optionText = item.html($scope);
                        } else {
                            // Incase we want to compile html string to initialize their custom directive in html string
                            if (item.compile) {
                                optionText = $compile(item.html)($scope);
                            } else {
                                // Assumes that the developer already placed a valid jQuery/jqLite element
                                optionText = item.html;
                            }
                        }
                    } else {
                        let $a = $('<a>');
                        let $anchorStyle = {};
                        if (leftOriented) {
                            $anchorStyle.textAlign = 'right';
                            $anchorStyle.paddingLeft = '8px';
                        } else {
                            $anchorStyle.textAlign = 'left';
                            $anchorStyle.paddingRight = '8px';
                        }

                        $a.css($anchorStyle);
                        $a.addClass('dropdown-item');
                        $a.attr({ tabindex: '-1', href: '#' });

                        let textParam = item.text || item[0];
                        let text = DEFAULT_ITEM_TEXT;

                        if (typeof textParam === 'string') {
                            text = textParam;
                        } else if (typeof textParam === 'function') {
                            text = textParam.call($scope, $scope, event, modelValue);
                        }

                        let $promise = $q.when(text);
                        $promises.push($promise);
                        $promise.then(function (pText) {
                            if (nestedMenu) {
                                let $arrow;
                                let $boldStyle = {
                                    fontFamily: 'monospace',
                                    fontWeight: 'bold'
                                };

                                if (leftOriented) {
                                    $arrow = '&lt;';
                                    $boldStyle.float = 'left';
                                } else {
                                    $arrow = '&gt;';
                                    $boldStyle.float = 'right';
                                }

                                let $bold = $('<strong style="font-family:monospace;font-weight:bold;float:right;">' + $arrow + '</strong>');
                                $bold.css($boldStyle);
                                $a.css('cursor', 'default');
                                $a.append($bold);
                            }
                            $a.append(pText);
                        });
                        optionText = $a;
                    }

                    $li.append(optionText);

                    return optionText;
                };

                /**
                 * Process each individual item
                 *
                 * Properties of params:
                 * - $scope
                 * - event
                 * - modelValue
                 * - level
                 * - item
                 * - $ul
                 * - $li
                 * - $promises
                 */
                function processItem(params) {
                    let nestedMenu = extractNestedMenu(params);
                    // if html property is not defined, fallback to text, otherwise use default text
                    // if first item in the item array is a function then invoke .call()
                    // if first item is a string, then text should be the string.
                    let text = DEFAULT_ITEM_TEXT;
                    let currItemParam = angular.extend({}, params);
                    let item = params.item;
                    let enabled = item.enabled === undefined ? item[2] : item.enabled;
                    currItemParam.nestedMenu = nestedMenu;
                    currItemParam.enabled = resolveBoolOrFunc(enabled, params);
                    currItemParam.text = createAndAddOptionText(currItemParam);
                    registerCurrentItemEvents(currItemParam);
                };

                /*
                * Registers the appropriate mouse events for options if the item is enabled.
                * Otherwise, it ensures that clicks to the item do not propagate.
                */
                function registerCurrentItemEvents (params) {
                    // Destructuring:
                    var item = params.item;
                    var $ul = params.$ul;
                    var $li = params.$li;
                    var $scope = params.$scope;
                    var modelValue = params.modelValue;
                    var level = params.level;
                    var event = params.event;
                    var text = params.text;
                    var nestedMenu = params.nestedMenu;
                    var enabled = params.enabled;
                    var orientation = String(params.orientation).toLowerCase();
                    var customClass = params.customClass;

                    if (enabled) {
                        let openNestedMenu = function ($event) {
                            removeContextMenus(level + 1);
                            /*
                            * The object here needs to be constructed and filled with data
                            * on an "as needed" basis. Copying the data from event directly
                            * or cloning the event results in unpredictable behavior.
                            */
                            /// adding the original event in the object to use the attributes of the mouse over event in the promises
                            let ev = {
                                pageX: orientation === 'left' ? event.pageX - $ul[0].offsetWidth + 1 : event.pageX + $ul[0].offsetWidth - 1,
                                pageY: $ul[0].offsetTop + $li[0].offsetTop - 3,
                                // eslint-disable-next-line angular/window-service
                                view: event.view || window,
                                target: event.target,
                                event: $event
                            };

                            /*
                            * At this point, nestedMenu can only either be an Array or a promise.
                            * Regardless, passing them to `when` makes the implementation singular.
                            */
                            $q.when(nestedMenu).then(function(promisedNestedMenu) {
                                if (angular.isFunction(promisedNestedMenu)) {
                                    //  support for dynamic subitems
                                    promisedNestedMenu = promisedNestedMenu.call($scope, $scope, event, modelValue, text, $li);
                                }
                                let nestedParam = {
                                    $scope : $scope,
                                    event : ev,
                                    options : promisedNestedMenu,
                                    modelValue : modelValue,
                                    level : level + 1,
                                    orientation: orientation,
                                    customClass: customClass
                                };
                                renderContextMenu(nestedParam);
                            });
                        };

                        $li.on('click', function ($event) {
                            if($event.which == 1) {
                                $event.preventDefault();
                                $scope.$apply(function () {

                                    let cleanupFunction = function () {
                                        $(event.currentTarget).removeClass('context');
                                        removeAllContextMenus();
                                    };
                                    let clickFunction = angular.isFunction(item.click) ? item.click : (angular.isFunction(item[1]) ? item[1] : null);

                                    if (clickFunction) {
                                        let res = clickFunction.call($scope, $scope, event, modelValue, text, $li);
                                        if(res === undefined || res) {
                                            cleanupFunction();
                                        }
                                    } else {
                                        cleanupFunction();
                                    }
                                });
                            }
                        });

                        $li.on('mouseover', function ($event) {
                            $scope.$apply(function () {
                                if (nestedMenu) {
                                    openNestedMenu($event);
                                } else {
                                    removeContextMenus(level + 1);
                                }
                            });
                        });
                    } else {
                        setElementDisabled($li);
                    }
                };

                /**
                 * @param params - an object containing the `item` parameter
                 * @returns an Array or a Promise containing the children,
                 *          or null if the option has no sub menu
                 */
                function extractNestedMenu(params) {
                    // Destructuring:
                    let item = params.item;

                    // New implementation:
                    if (item.children) {
                        if (angular.isFunction(item.children)) {
                            // Expects a function that returns a Promise or an Array
                            return item.children();
                        } else if (angular.isFunction(item.children.then) || angular.isArray(item.children)) {
                            // Returns the promise
                            // OR, returns the actual array
                            return item.children;
                        }
                        return null;
                    } else {
                        // nestedMenu is either an Array or a Promise that will return that array.
                        // NOTE: This might be changed soon as it's a hangover from an old implementation

                        return angular.isArray(item[1]) ||
                            (item[1] && angular.isFunction(item[1].then)) ? item[1] : angular.isArray(item[2]) ||
                            (item[2] && angular.isFunction(item[2].then)) ? item[2] : angular.isArray(item[3]) ||
                            (item[3] && angular.isFunction(item[3].then)) ? item[3] : null;
                    }
                }

                /**
                 * Responsible for the actual rendering of the context menu.
                 *
                 * The parameters in params are:
                 * - $scope = the scope of this context menu
                 * - event = the event that triggered this context menu
                 * - options = the options for this context menu
                 * - modelValue = the value of the model attached to this context menu
                 * - level = the current context menu level (defaults to 0)
                 * - customClass = the custom class to be used for the context menu
                 */
                function renderContextMenu (params) {
                    /// <summary>Render context menu recursively.</summary>
                    // Destructuring:
                    let $scope = params.$scope;
                    let event = params.event;
                    let options = params.options;
                    let modelValue = params.modelValue;
                    let level = params.level;
                    let customClass = params.customClass;
                    // Initialize the container. This will be passed around
                    let $ul = initContextMenuContainer(params);
                    params.$ul = $ul;
                    // Register this level of the context menu
                    _contextMenus.push($ul);
                    /*
                    * This object will contain any promises that we have
                    * to wait for before trying to adjust the context menu.
                    */
                    let $promises = [];
                    params.$promises = $promises;
                    angular.forEach(options, function (item) {

                        if (item === null) {
                            appendDivider($ul);
                        } else {
                            // If displayed is anything other than a function or a boolean
                            let displayed = resolveBoolOrFunc(item.displayed, params);

                            // Only add the <li> if the item is displayed
                            if (displayed) {
                                let $li = $('<li>');
                                let itemParams = angular.extend({}, params);
                                itemParams.item = item;
                                itemParams.$li = $li;

                                if (typeof item[0] === 'object') {
                                    ContextMenuService.initialize($li, item);
                                } else {
                                    processItem(itemParams);
                                }
                                if (resolveBoolOrFunc(item.hasTopDivider, itemParams, false)) {
                                    appendDivider($ul);
                                }
                                $ul.append($li);
                                if (resolveBoolOrFunc(item.hasBottomDivider, itemParams, false)) {
                                    appendDivider($ul);
                                }
                            }
                        }
                    });

                    if ($ul.children().length === 0) {
                        let $emptyLi = angular.element('<li>');
                        setElementDisabled($emptyLi);
                        $emptyLi.html('<a>' + _emptyText + '</a>');
                        $ul.append($emptyLi);
                    }

                    $document.find('body').append($ul);
                    doAfterAllPromises(params);
                    $rootScope.$broadcast(ContextMenuEvents.ContextMenuOpened, {
                        context: _clickedElement,
                        contextMenu: $ul,
                        params: params
                    });
                };

                /**
                 * calculate if drop down menu would go out of screen at left or bottom
                 * calculation need to be done after element has been added (and all texts are set; thus the promises)
                 * to the DOM the get the actual height
                 */
                function doAfterAllPromises (params) {
                    // Destructuring:
                    let $ul = params.$ul;
                    let $promises = params.$promises;
                    let level = params.level;
                    let event = params.event;
                    let leftOriented = String(params.orientation).toLowerCase() === 'left';

                    $q.all($promises).then(function () {
                        let topCoordinate  = event.pageY;
                        let menuHeight = angular.element($ul[0]).prop('offsetHeight');
                        let winHeight = $window.pageYOffset + event.view.innerHeight;

                        /// the 20 pixels in second condition are considering the browser status bar that sometimes overrides the element
                        if (topCoordinate > menuHeight && winHeight - topCoordinate < menuHeight + 20) {
                            topCoordinate = event.pageY - menuHeight;
                            /// If the element is a nested menu, adds the height of the parent li to the topCoordinate to align with the parent
                            if(level && level > 0) {
                                topCoordinate += event.event.currentTarget.offsetHeight;
                            }
                        } else if(winHeight <= menuHeight) {
                            // If it really can't fit, reset the height of the menu to one that will fit
                            angular.element($ul[0]).css({ 'height': winHeight - 5, 'overflow-y': 'scroll' });
                            // ...then set the topCoordinate height to 0 so the menu starts from the top
                            topCoordinate = 0;
                        } else if(winHeight - topCoordinate < menuHeight) {
                            var reduceThresholdY = 5;
                            if(topCoordinate < reduceThresholdY) {
                                reduceThresholdY = topCoordinate;
                            }
                            topCoordinate = winHeight - menuHeight - reduceThresholdY;
                        }

                        let leftCoordinate = event.pageX;
                        let menuWidth = angular.element($ul[0]).prop('offsetWidth');
                        let winWidth = event.view.innerWidth + window.pageXOffset;
                        let padding = 5;

                        if (leftOriented) {
                            if (winWidth - leftCoordinate > menuWidth && leftCoordinate < menuWidth + padding) {
                                leftCoordinate = padding;
                            } else if (leftCoordinate < menuWidth) {
                                let reduceThresholdX = 5;
                                if (winWidth - leftCoordinate < reduceThresholdX + padding) {
                                    reduceThresholdX = winWidth - leftCoordinate + padding;
                                }
                                leftCoordinate = menuWidth + reduceThresholdX + padding;
                            } else {
                                leftCoordinate = leftCoordinate - menuWidth;
                            }
                        } else {
                            if (leftCoordinate > menuWidth && winWidth - leftCoordinate - padding < menuWidth) {
                                leftCoordinate = winWidth - menuWidth - padding;
                            } else if(winWidth - leftCoordinate < menuWidth) {
                                let reduceThresholdX = 5;
                                if(leftCoordinate < reduceThresholdX + padding) {
                                    reduceThresholdX = leftCoordinate + padding;
                                }
                                leftCoordinate = winWidth - menuWidth - reduceThresholdX - padding;
                            }
                        }

                        $ul.css({
                            display: 'block',
                            position: 'absolute',
                            left: leftCoordinate + 'px',
                            top: topCoordinate + 'px'
                        });
                    });

                };

                /**
                 * Creates the container of the context menu (a <ul> element),
                 * applies the appropriate styles and then returns that container
                 *
                 * @return a <ul> jqLite/jQuery element
                 */
                function initContextMenuContainer(params) {
                    // Destructuring
                    let customClass = params.customClass;

                    let $ul = $('<ul>');
                    $ul.addClass('dropdown-menu');
                    $ul.attr({ 'role': 'menu' });
                    $ul.css({
                        display: 'block',
                        position: 'absolute',
                        left: params.event.pageX + 'px',
                        top: params.event.pageY + 'px',
                        'z-index': 10000
                    });

                    if(customClass) {
                        $ul.addClass(customClass);
                    }
                    return $ul;
                }

                function isTouchDevice() {
                    return 'ontouchstart' in window  || navigator.maxTouchPoints; // works on most browsers | works on IE10/11 and Surface
                }

                /**
                 * Removes the context menus with level greater than or equal
                 * to the value passed. If undefined, null or 0, all context menus
                 * are removed.
                 */
                function removeContextMenus (level) {
                    while (_contextMenus.length && (!level || _contextMenus.length > level)) {
                        let cm = _contextMenus.pop();
                        $rootScope.$broadcast(ContextMenuEvents.ContextMenuClosed, { context: _clickedElement, contextMenu: cm });
                        cm.remove();
                    }
                    if(!level) {
                        $rootScope.$broadcast(ContextMenuEvents.ContextMenuAllClosed, { context: _clickedElement });
                    }
                }

                function removeOnScrollEvent(e) {
                    removeAllContextMenus(e);
                }

                function removeOnOutsideClickEvent(e) {
                    let $curr = $(e.target);
                    let shouldRemove = true;

                    while($curr.length) {
                        if ($curr.hasClass('dropdown-menu')) {
                            shouldRemove = false;
                            break;
                        } else {
                            $curr = $curr.parent();
                        }
                    }
                    if (shouldRemove) {
                        removeAllContextMenus(e);
                    }
                }

                function removeAllContextMenus(e) {
                    $document.find('body').off('mousedown touchstart', removeOnOutsideClickEvent);
                    $document.off('scroll', removeOnScrollEvent);
                    $(_clickedElement).removeClass('context');
                    removeContextMenus();
                    $rootScope.$broadcast('');
                }

                function isBoolean(a) {
                    return a === false || a === true;
                }

                /** Resolves a boolean or a function that returns a boolean
                 * Returns true by default if the param is null or undefined
                 * @param a - the parameter to be checked
                 * @param params - the object for the item's parameters
                 * @param defaultValue - the default boolean value to use if the parameter is
                 *  neither a boolean nor function. True by default.
                 */
                function resolveBoolOrFunc(a, params, defaultValue) {
                    let item = params.item;
                    let $scope = params.$scope;
                    let event = params.event;
                    let modelValue = params.modelValue;

                    defaultValue = isBoolean(defaultValue) ? defaultValue : true;

                    if (isBoolean(a)) {
                        return a;
                    } else if (angular.isFunction(a)) {
                        return a.call($scope, $scope, event, modelValue);
                    } else {
                        return defaultValue;
                    }
                }

                function appendDivider($ul) {
                    let $li = angular.element('<li>');
                    $li.addClass('divider');
                    $ul.append($li);
                }

                function setElementDisabled($li) {
                    $li.on('click', function ($event) {
                        $event.preventDefault();
                    });
                    $li.addClass('disabled');
                }

                return function ($scope, element, attrs) {
                    let openMenuEvents = ['contextmenu'];
                    _emptyText = $scope.$eval(attrs.contextMenuEmptyText) || 'empty';

                    if(attrs.contextMenuOn && typeof(attrs.contextMenuOn) === 'string') {
                        openMenuEvents = attrs.contextMenuOn.split(',');
                    }

                    angular.forEach(openMenuEvents, function (openMenuEvent) {
                        element.on(openMenuEvent.trim(), function (event) {
                            // Cleanup any leftover context-menus(there are cases with long press on touch where we
                            // still see multiple context-menus)
                            removeAllContextMenus();

                            if (!attrs.allowEventPropagation) {
                                event.stopPropagation();
                                event.preventDefault();
                            }

                            // Don't show context menu if on touch device and element is draggable
                            if (isTouchDevice() && element.attr('draggable') === 'true') {
                                return false;
                            }

                            // Remove if the user clicks outside
                            $document.find('body').on('mousedown touchstart', removeOnOutsideClickEvent);
                            // Remove the menu when the scroll moves
                            $document.on('scroll', removeOnScrollEvent);

                            _clickedElement = event.currentTarget;
                            $(_clickedElement).addClass('context');

                            $scope.$apply(function () {
                                let options = $scope.$eval(attrs.contextMenu);
                                let customClass = attrs.contextMenuClass;
                                let modelValue = $scope.$eval(attrs.model);
                                let orientation = attrs.contextMenuOrientation;

                                $q.when(options).then(function(promisedMenu) {
                                    if (angular.isFunction(promisedMenu)) {
                                        //  support for dynamic items
                                        promisedMenu = promisedMenu.call($scope, $scope, event, modelValue);
                                    }
                                    let params = {
                                        '$scope' : $scope,
                                        'event' : event,
                                        'options' : promisedMenu,
                                        'modelValue' : modelValue,
                                        'level' : 0,
                                        'customClass' : customClass,
                                        'orientation': orientation
                                    };
                                    $rootScope.$broadcast(ContextMenuEvents.ContextMenuOpening, { context: _clickedElement });
                                    renderContextMenu(params);
                                });
                            });

                            // Remove all context menus if the scope is destroyed
                            $scope.$on('$destroy', function () {
                                removeAllContextMenus();
                            });
                        });
                    });

                    if (attrs.closeMenuOn) {
                        $scope.$on(attrs.closeMenuOn, function () {
                            removeAllContextMenus();
                        });
                    }
                };
            }
        ]);

        // eslint-disable-next-line angular/window-service
})(window.angular.element, window.angular);
