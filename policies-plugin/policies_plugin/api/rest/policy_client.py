# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.policy_test_api import get_text

@urls.register
class PolicyClient(generic.View):
    url_regex = r'policy-client/policies/$'

    @rest_utils.ajax()
    def get(self, request):
        list_of_policies = get_text()
        greeting = {
          'id': 'Test',
          'name': list_of_policies[0]
        }
        #greeting = {
        #  'id': 'Hello',
        #  'name': 'Hello world!'
        #}
        policies = {'items': greeting}
        return policies
