import logging

from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.policy_api import Policy_API
LOG = logging.getLogger(__name__)

@urls.register
class PolicyClient(generic.View):
    url_regex = r'policy-client/policies/$'
    policy_API = Policy_API()

    @rest_utils.ajax()
    def get(self, request):
        policies = self.policy_API.get_policies()

        policy_objects = []
        for policy in policies:
            policy_objects.append(policy.to_json())

        return {'items': policy_objects}
