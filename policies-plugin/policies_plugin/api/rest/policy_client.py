from policies_plugin.api.models.policy import Policy
from policies_plugin.api.resources.policy_getter import local_get_policies, local_set_policy
import logging

LOG = logging.getLogger(__name__)

class Policy_Client:

    def get_policies(self):
        policy_lines = self.keystone_get_policies()
        policies = []
        for line in policy_lines:
            policies.append(Policy().from_line(line))
        return policies

    def get_policy(self, request, project, target):
        policy_line = self.keystone_get_policy(project, target)
        return Policy().from_line(policy_line)

    def set_policy(self, policy):
        return self.keystone_set_policy(policy)

    def keystone_get_policies(self):
        list_of_policies = []
        for line in local_get_policies("keystone"): # FIXME - Should not be hard coded to "keystone"
            list_of_policies.append(line.rstrip())
        return list_of_policies

    def keystone_get_policy(self, project, target):
        identifier = ""
        if (project != "global"):
            identifier = project+":"+target
        else:
            identifier = target
        policy_line = ""

        for line in local_get_policies("keystone"): # FIXME - Should not be hard coded to "keystone"
            if identifier in line:
                policy_line = line.rstrip()
        return policy_line

    def keystone_set_policy(self, policy):
        return local_set_policy("keystone", policy) # FIXME - Should not be hard coded to "keystone"
