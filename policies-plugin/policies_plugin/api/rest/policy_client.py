import logging
import itertools

from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.policy_api import Policy_API
from policies_plugin.models.policy import Policy
LOG = logging.getLogger(__name__)

@urls.register
class PolicyClient(generic.View):
    url_regex = r'policy-client/policies/$'
    policy_API = Policy_API()

    @rest_utils.ajax()
    def get(self, request):
        policies = self.policy_API.get_policies()
        items = policies.items()

        results = []
        for item in items:
            results.append(item[1])

        policy_items = []
        for result in list(itertools.chain.from_iterable(results)):
            policy_item = Policy()
            policy_item.from_item(result)
            policy_items.append(policy_item)

        policy_objects = []
        for policy_obj in policy_items:
            policy_objects.append(policy_obj.to_json())

        return {'items': policy_objects}
