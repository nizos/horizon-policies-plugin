import logging
from oslo_policy import policy

LOG = logging.getLogger(__name__)

# Policy Class
class Policy:
    # CONSTRUCTOR
    def __init__(self,
                namespace="Default namespace",
                target="Default target",
                rule="Default rule",
                scopes="Default scopes",
                operations="Default operations",
                description="Default description"):
        self.namespace = namespace
        self.target = target
        self.rule = rule
        self.scopes = scopes
        self.operations = operations
        self.description = description

    def from_item(self, item):
        self.namespace = self.set_namespace_from_name(repr(item.name))
        self.target = self.set_target_from_name(repr(item.name))
        self.rule = self.strip_quotes(repr(item.check_str))
        self.scopes = self.set_scopes(item)
        self.operations = self.set_operations(item)
        self.description = self.strip_quotes(repr(item.description))

    # HELPERS
    # Look for single quotes at the begining and end
    # of text string and return it without them
    def strip_quotes(self, input_text):
        if input_text.startswith("'") and input_text.endswith("'"):
            input_text = input_text[1:-1]
        return input_text

    def set_namespace_from_name(self, name):
        part = self.strip_quotes(name)
        if ":" in part:
            part = part.split(':')[0]
        else:
            part = "Global"
        return part

    def set_target_from_name(self, name):
        part = self.strip_quotes(name)
        if ":" in part:
            part = part.split(':')[1]
        else:
            part = self.strip_quotes(name)
        return part

    # SETTERS
    def set_operations(self, item):
        operations_value = []
        if (isinstance(item, policy.DocumentedRuleDefault)):
            operations_value = self.format_operations(item.operations)
        else:
            operations_value = ["None"]
        return operations_value

    def format_operations(self, operations):
        formatted = []
        for operation in operations:
            formatted.append(self.strip_quotes(repr(operation["method"]))
            + " " + self.strip_quotes(repr(operation["path"])))
        return formatted

    def set_scopes(self, item):
        scopes_value = []
        if (isinstance(item, policy.DocumentedRuleDefault)):
            scopes_value = self.format_scopes(item.scope_types)
        else:
            scopes_value = ["None"]
        return scopes_value

    def format_scopes(self, scopes):
        formatted = []
        try:
            length = len(scopes)
            for i in range(length):
                formatted.append(scopes[i])
        except TypeError:
            LOG.debug(TypeError)
        return formatted

     # GETTER
    def to_json(self):
        policy_json = {
                'namespace': self.namespace,
                'target': self.target,
                'rule': self.rule,
                'scopes': self.scopes,
                'operations': self.operations,
                'description': self.description
            }
        return policy_json
