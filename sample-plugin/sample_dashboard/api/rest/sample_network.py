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
"""sample API over neutron 
"""

from django.views import generic

from openstack_dashboard.api import neutron
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils

@urls.register
class SampleNetwork(generic.View):
    """ sample interface for networks
    """
    url_regex = r'sample-network/networks/$'

    @rest_utils.ajax()
    def get(self, request):
        """List networks for current project.
        The listing result is an object with property "items".
        """
        networks = neutron.network_list(request)
        return {'items': networks}

    @rest_utils.ajax()
    def put(self, request, data_required=True):
        network_id = request.DATA['id']
        parms = {'admin_state_up': request.DATA['admin_state_up']}
        neutron.network_update(request, network_id, **parms)

