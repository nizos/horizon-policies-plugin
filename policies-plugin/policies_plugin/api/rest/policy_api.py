import logging

from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.policy_client import Policy_Client
LOG = logging.getLogger(__name__)

@urls.register
class Policies(generic.View):
    url_regex = r'policy-api/policies/$'
    policy_Client = Policy_Client()

    @rest_utils.ajax()
    def get(self, request):
        policies = self.policy_Client.get_policies()

        policy_objects = []
        for policy in policies:
            policy_objects.append(policy.to_json())
        return {'items': policy_objects}

@urls.register
class Policy(generic.View):
    url_regex = r'policy-api/policy/(?P<project>[^/]+)/(?P<target>[^/]+)$'
    policy_Client = Policy_Client()

    @rest_utils.ajax()
    def get(self, request, project, target):
        policy = self.policy_Client.get_policy(request, project, target)
        return {'item': policy.to_json()}
