from oslo_policy import generator
from policies_plugin.api.models.policy import Policy
import os
import logging

LOG = logging.getLogger(__name__)

class Policy_Client:

    FILE_PATH = "/opt/stack/horizon/horizon-policies-plugin/" + "policies-plugin/policies_plugin/api/resources/policy_output.txt"

    def get_policies(self):
        policy_lines = self.keystone_get_policies()
        policies = []
        for line in policy_lines:
            policies.append(Policy().from_line(line))
        return policies

    def get_policy(self, request, project, target):
        policy_line = self.keystone_get_policy(project, target)
        return Policy().from_line(policy_line)

    def keystone_get_policies(self):
        generator._generate_policy("keystone", self.FILE_PATH)
        list_of_policies = []
        with open(self.FILE_PATH) as file:
            for line in file:
                list_of_policies.append(line.rstrip())
        os.remove(self.FILE_PATH)
        return list_of_policies

    def keystone_get_policy(self, project, target):
        generator._generate_policy("keystone", self.FILE_PATH)

        identifier = ""
        if (project != "global"):
            identifier = project+":"+target
        else:
            identifier = target
        policy_line = ""
        with open(self.FILE_PATH) as file:
            for line in file:
                if identifier in line:
                    policy_line = line.rstrip()
        os.remove(self.FILE_PATH)
        return policy_line
