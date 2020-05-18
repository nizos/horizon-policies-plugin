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
from policies_plugin.api.resources.keystone_fields import keystone_docs

LOG = logging.getLogger(__name__)


# Policy Class
class Policy:
    def __init__(self,
                 project="Project",
                 target="Target",
                 rule="Rule",
                 default="Default rule",
                 scopes="Scopes",
                 operations="Operations",
                 description="Description"):
        self.project = project
        self.target = target
        self.rule = rule
        self.default = default
        self.scopes = scopes
        self.operations = operations
        self.description = description

    def from_line(self, line):
        line_formatted = self.strip_new_line(self.strip_quotes(line))
        line_target = line_formatted.split('": "')[0]
        self.set_project(line_target)
        self.set_target(line_target)
        self.set_rule(line_formatted)
        policy_dict = self.get_dict()
        self.set_default(policy_dict)
        self.set_scopes(policy_dict)
        self.set_operations(policy_dict)
        self.set_description(policy_dict)
        return self

    # SETTERS

    def get_dict(self):
        policy_dict = ""
        try:
            policy_dict = keystone_docs[self.create_identifier()]
        except KeyError:
            policy_dict = None
        return policy_dict

    def create_identifier(self):
        identifier = ""
        if (self.project != "global"):
            identifier = self.project + ":" + self.target
        else:
            identifier = self.target
        return identifier

    def set_project(self, line_target):
        if ':' in line_target:
            self.project = line_target.split(':')[0]
        else:
            self.project = "global"

    def set_target(self, line_target):
        if ':' in line_target:
            self.target = line_target.split(':')[1]
        else:
            self.target = line_target

    def set_rule(self, line_stripped_new_line):
        if '": "' in line_stripped_new_line:
            self.rule = line_stripped_new_line.split('": "')[1]
        else:
            self.rule = "None"
            LOG.error("No rule provided for requested policy target: {}"
                      .format(line_stripped_new_line))

    def set_default(self, policy_dict):
        try:
            self.default = policy_dict["default"]
        except Exception:
            self.default = "No default"

    def set_scopes(self, policy_dict):
        try:
            self.scopes = policy_dict["scopes"]
        except Exception:
            self.scopes = "No scopes"

    def set_operations(self, policy_dict):
        try:
            self.operations = policy_dict["operations"]
        except Exception:
            self.operations = "No operations"

    def set_description(self, policy_dict):
        try:
            self.description = policy_dict["description"]
        except Exception:
            self.description = "No description"

    # GETTERS
    def to_json(self):
        policy_json = {
            'project': self.project,
            'target': self.target,
            'rule': self.rule,
            'default': self.default,
            'scopes': self.scopes,
            'operations': self.operations,
            'description': self.description
        }
        return policy_json

    # HELPERS
    def strip_quotes(self, input_text):
        stripped = input_text[1:-1]
        return stripped

    def strip_new_line(self, input_text):
        stripped = input_text.rstrip()
        return stripped
