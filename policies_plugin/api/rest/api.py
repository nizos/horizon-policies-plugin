# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import logging

from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.client import Client

LOG = logging.getLogger(__name__)


@urls.register
class Rule(generic.View):
    url_regex = r'rule/(?P<project>[^/]+)/(?P<target>[^/]+)$'
    client = Client()

    @rest_utils.ajax()
    def get(self, request, project, target):
        return self.client.get_rule(request, project, target)

    @rest_utils.ajax(data_required=True)
    def post(self, request, project, target):
        return self.client.set_rule(request)


@urls.register
class Rules(generic.View):
    url_regex = r'rules/$'
    client = Client()

    @rest_utils.ajax()
    def get(self, request):
        return self.client.get_rules(request)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        return self.client.set_rules(request)
