/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
  "use strict";

  describe('Drinks service', function() {
    var service;
    beforeEach(module('horizon.app.core.openstack-service-api'));
    beforeEach(module('horizon.dashboard.cafe.drinks'));
    beforeEach(inject(function($injector) {
      service = $injector.get('horizon.dashboard.cafe.drinks.service');
    }));

    describe('getPromise', function() {
      it("provides a promise", inject(function($q, $injector, $timeout) {
        var api = $injector.get('horizon.app.core.openstack-service-api.cafe');
        var deferred = $q.defer();
        spyOn(api, 'getDrinks').and.returnValue(deferred.promise);
        var result = service.getPromise({});
        deferred.resolve({
          data:{
            items: [{id: '123abc', name: 'resource1'}]
          }
        });
        $timeout.flush();
        expect(api.getDrinks).toHaveBeenCalled();
        expect(result.$$state.value.data.items[0].name).toBe('resource1');
      }));
    });

    describe('urlFunction', function() {
      it("get url", inject(function($injector) {
        var detailRoute = $injector.get('horizon.app.core.detailRoute');
        var result = service.urlFunction({id:"123abc"});
        expect(result).toBe(detailRoute + "OS::Cafe::Drink/123abc");
      }));
    });

  });

})();

