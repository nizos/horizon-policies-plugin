from policies_plugin.api.models.policy import Policy
from oslo_policy import generator, policy, _parser
from django.http import HttpResponse
from openstack_auth import policy as verify
import json
import logging

LOG = logging.getLogger(__name__)

# Client that manages policy rules
class Client:

    # Get a single rule by specifying its project and target values
    def get_rule(self, request, project, target):

        # Verify that the user attempting this is authorized to do so.
        if not verify.check((("identity", "identity:get_policy"),), request):
            resp = HttpResponse()
            resp.status_code = 404 # 404 due to 401 foring system logout.
            return resp

        # Get the current rules from the policy file
        rules = self.get_rules(request)
        # Get the requested rule's identifier
        rule_id = self.get_identifier(project, target)

        # Prepare a response variable
        response = ""
        # Loop through the retrieved rules
        for rule in rules:
            # Find the requested rule by its identifier
            if rule_id in rule:
                # Set the found rule as the response
                response = Policy().from_line(rule.rstrip()).to_json()
        return response

    # Modify single rule by providing its values in the request parameter
    def set_rule(self, request):
        # Verify that the user attempting this is authorized to do so.
        if not verify.check((("identity", "identity:modify_policy"),), request):
            resp = HttpResponse()
            resp.status_code = 404 # 404 due to 401 foring system logout.
            return resp

        # Test the parsing of the rule before proceeding
        new_rule = request.DATA
        try:
           val = self.test_parsing(new_rule['rule'])
        except ValueError as e:
           resp = HttpResponse()
           resp.status_code = 400
           resp.content = str(e)
           return resp

        # Ensure that existing rules are up to date
        enforcer = generator._get_enforcer("keystone")
        enforcer.load_rules()

        # Create a dictionary of the existing rules
        current_rules_list = [policy.RuleDefault(name, default.check_str)
                    for name, default in enforcer.file_rules.items()]
        current_rules_dict = {'rules': current_rules_list}

        # Create a new rules dictionary
        new_rules_dict = dict()

        # Loop through the existing rules and add them to the new rules dictionary
        for rule in sorted(current_rules_dict.keys()):
            rule_defaults = current_rules_dict[rule]
            for rule_default in rule_defaults:
                # add the rules to the new rules dictionary
                new_rules_dict[rule_default.name] = rule_default.check_str

        # Get the new rules identifier and add/update it in the new rules dictionary
        new_rule_id = self.get_identifier(new_rule['project'], new_rule['target'])
        new_rules_dict[new_rule_id] = new_rule['rule']

        # Write the new rules dictionary to the policy file
        with open('/etc/keystone/policy.json', 'w') as policyfile:
            json.dump(new_rules_dict, policyfile,
                sort_keys=True, indent=4, separators=(',', ': '))

        # Return a success status code
        resp = HttpResponse()
        resp.status_code = 200
        return resp

    # Get all the available rules
    def get_rules(self, request):

        # Verify that the user attempting this is authorized to do so.
        if not verify.check((("identity", "identity:get_policy"),), request):
            resp = HttpResponse()
            resp.status_code = 404 # 404 due to 401 foring system logout.
            return resp

        # Ensure that existing rules are up to date
        enforcer = generator._get_enforcer("keystone")
        enforcer.load_rules()

        # Create a dictionary of the existing rules
        current_rules_list = [policy.RuleDefault(name, default.check_str)
                    for name, default in enforcer.file_rules.items()]
        registered_rules_list = [policy.RuleDefault(name, default.check_str)
                            for name, default in enforcer.registered_rules.items()
                            if name not in enforcer.file_rules]
        all_rules_dict = {'rules': current_rules_list + registered_rules_list}

        # Create a rules list
        rules = []
        # Loop through all the rules and append them to the rules list
        for rule in generator._sort_and_format_by_section(all_rules_dict, include_help=False):
            rules.append(Policy().from_line(rule.rstrip()).to_json())
        return rules


    def set_rules(self, request):

        # Verify that the user attempting this is authorized to do so.
        if not verify.check((("identity", "identity:modify_policy"),), request):
            resp = HttpResponse()
            resp.status_code = 404 # 404 due to 401 foring system logout.
            return resp

        # Test the parsing of the new rules before proceeding for early failure
        new_rules = request.DATA
        for new_rule in new_rules:
            try:
                val = self.test_parsing(new_rule['rule'])
            except ValueError as e:
                resp = HttpResponse()
                resp.status_code = 400
                resp.content = str(e)
                return resp

        # Ensure that existing rules are up to date
        enforcer = generator._get_enforcer("keystone")
        enforcer.load_rules()
        # Create a dict of the existing rules
        current_rules_list = [policy.RuleDefault(name, default.check_str)
                    for name, default in enforcer.file_rules.items()]
        current_rules_dict = {'rules': current_rules_list}
        # Create a new rules dictionary
        new_rules_dict = dict()

        # Loop through the existing rules
        for rule in sorted(current_rules_dict.keys()):
            rule_defaults = current_rules_dict[rule]
            for rule_default in rule_defaults:
                # add the rules to the new rules dictionary
                new_rules_dict[rule_default.name] = rule_default.check_str

        # Loop through the new rules sent in the request
        for new_rule in new_rules:
            # Create an identifier using the rule's project and target
            new_rule_id = self.get_identifier(new_rule['project'], new_rule['target'])
            # Add/Update the new rule in the new rules dictionary
            new_rules_dict[new_rule_id] = new_rule['rule']

        # Write the new rules dict to the policy file
        with open('/etc/keystone/policy.json', 'w') as policyfile:
            json.dump(new_rules_dict, policyfile,
                sort_keys=True, indent=4, separators=(',', ': '))

        # Return 200 OK, everything went well.
        resp = HttpResponse()
        resp.status_code = 200
        return resp

    # Tests the parsing of the rule values
    def test_parsing(self, rule):
        try:
            rule_in_quotes = "\""+rule+"\""
            kind, match = rule_in_quotes.split(':', 1)
        except Exception:
            raise ValueError('Failed to understand rule %s'.format(*rule))
        # Find what implements the check
        extension_checks = _parser._checks.get_extensions()
        if kind in extension_checks:
            return extension_checks[kind](kind, match)
        elif kind in _parser._checks.registered_checks:
            return _parser._checks.registered_checks[kind](kind, match)
        elif None in _parser._checks.registered_checks:
            return _parser._checks.registered_checks[None](kind, match)
        else:
            raise ValueError('No handler for matches of kind %s'.format(*kind))

    # Creates an identifier for a rule provided its project and target
    def get_identifier(self, project, target):
        if (project != "global"):
            return project+":"+target
        else:
            return target
