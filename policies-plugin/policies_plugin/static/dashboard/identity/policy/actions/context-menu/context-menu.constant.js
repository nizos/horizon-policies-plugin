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
        .constant('ContextMenuEvents', {
            // Triggers when all the context menus have been closed
            ContextMenuAllClosed: 'context-menu-all-closed',
            // Triggers when any single context menu is called.
            // Closing all context menus triggers this for each level open
            ContextMenuClosed: 'context-menu-closed',
            // Triggers right before the very first context menu is opened
            ContextMenuOpening: 'context-menu-opening',
            // Triggers right after any context menu is opened
            ContextMenuOpened: 'context-menu-opened'
        });
})();
