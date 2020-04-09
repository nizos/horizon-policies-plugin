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

            if ':' in target:
                # Extract the project and target from the target string
                policy_item.project = target.split(':')[0]
                policy_item.target = target.split(':')[1]
            else:
                # In case it did not have any project (and likely were a rule), set it to Global instead
                policy_item.project = "Global"
                policy_item.target = target

            try:
                # Attempt to get the default values from the dict
                policy_item.default = keystone_docs[target]["default"]
                policy_item.scopes = keystone_docs[target]["scopes"]
                policy_item.operations = keystone_docs[target]["operations"]
                policy_item.description = keystone_docs[target]["description"]
            except KeyError:
                # In case there was no defaults, set up the values for a home made policy.
                policy_item.default = policy_item.target
                policy_item.scopes = "HOME_BREW" # FIXME - There was another way to get scopes/targets?
                policy_item.operations = "HOME_BREW" # FIXME - There was another way to get scopes/targets?
                policy_item.description = "Non-default policy, made by the user"

            policy_item.rule = formatted.split('": "')[1]



            policy_items.append(policy_item)

        return policy_items

