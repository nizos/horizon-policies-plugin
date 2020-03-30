import logging
import itertools

from django.views import generic
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from policies_plugin.api.rest.policy_api import get_policies
LOG = logging.getLogger(__name__)


@urls.register
class PolicyClient(generic.View):
    url_regex = r'policy-client/policies/$'

    @rest_utils.ajax()
    def get(self, request):

        policies = get_policies()
        items = policies.items()
        results = []
        policy_items = []
        counter = 0

        for i in items:
          results.append(i[1])

        for policy in list(itertools.chain.from_iterable(results)):
          policy_item = {
            'id': repr(counter),
            'name': repr(policy.name),
            'check_str': repr(policy.check_str),
            'description': repr(policy.description)
          }
          policy_items.append(policy_item)
          counter += 1

        return {'items': policy_items}