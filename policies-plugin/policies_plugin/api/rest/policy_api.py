from oslo_policy import generator
from policies_plugin.models.policy import Policy
from policies_plugin.api.rest.keystone_fields import keystone_docs
import logging

LOG = logging.getLogger(__name__)

class Policy_API:

    def get_policies(self):
        FILE_PATH = "/opt/stack/horizon/horizon-policies-plugin/" + "policies-plugin/policies_plugin/api/rest/policy_output.txt"

        generator._generate_policy("keystone", FILE_PATH)

        list_of_policies = []
        with open(FILE_PATH) as file:
            for line in file:
                list_of_policies.append(line.rstrip())

        policy_items = []
        for policy in list_of_policies:
            policy_item = Policy()
            formatted = policy[1:-1]
            formatted = formatted.rstrip()
            target = formatted.split('": "')[0]

            policy_item.default = keystone_docs[target]["default"]
            policy_item.scopes = keystone_docs[target]["scopes"]
            policy_item.operations = keystone_docs[target]["operations"]
            policy_item.description = keystone_docs[target]["description"]
            policy_item.rule = formatted.split('": "')[1]

            if ':' in target:
                policy_item.project = target.split(':')[0]
                policy_item.target = target.split(':')[1]
            else:
                policy_item.project = "Global"
                policy_item.target = target

            policy_items.append(policy_item)

        return policy_items
