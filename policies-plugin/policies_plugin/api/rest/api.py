from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.client import Client
import logging

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
        return self.client.set_rule(request.DATA['rule'])

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
