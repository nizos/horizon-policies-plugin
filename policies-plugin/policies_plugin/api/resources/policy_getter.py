from oslo_policy import generator, policy, _parser
from django.http import HttpResponse

import json
import logging

LOG = logging.getLogger(__name__)

def local_get_policies(namespace):
    """Generate a policy file showing what will be used.

    This takes all registered policies and merges them with what's defined in
    a policy file and outputs the result. That result is the effective policy
    that will be honored by policy checks.

    This method has been adapted from the oslo_policy's generator._get_policy() to
    suit system specific needs in way that is not very hack-y
    """
    enforcer = generator._get_enforcer(namespace)
    # Ensure that files have been parsed
    enforcer.load_rules()

    file_rules = [policy.RuleDefault(name, default.check_str)
                for name, default in enforcer.file_rules.items()]
    registered_rules = [policy.RuleDefault(name, default.check_str)
                        for name, default in enforcer.registered_rules.items()
                        if name not in enforcer.file_rules]
    policies = {'rules': file_rules + registered_rules}

    output_file = []

    for section in generator._sort_and_format_by_section(policies, include_help=False):
        output_file.append(section)

    return output_file

#FIXME Create new file policy_setter.py?
def local_set_policy(namespace, updateRule):
    enforcer = generator._get_enforcer(namespace)
    # Ensure that files have been parsed
    enforcer.load_rules()

    file_rules = [policy.RuleDefault(name, default.check_str)
                for name, default in enforcer.file_rules.items()]

    if (updateRule['project'] != "global"):
        identifier = updateRule['project']+":"+updateRule['target']
    else:
        identifier = updateRule['target']

    policy_dict = {}

    file_rules_dict = {'rules': file_rules}
    for section in sorted(file_rules_dict.keys()):
        rule_defaults = file_rules_dict[section]
        for rule in rule_defaults:
            policy_dict[rule.name] = rule.check_str

    try:
        val = throwing_parse_check("\""+ updateRule['rule']+"\"")
    except ValueError as e:
        resp = HttpResponse()
        resp.status_code = 400
        resp.content = str(e)
        return resp

    policy_dict[identifier] = updateRule['rule']

    #FIXME - Path should not be hardcoded - /etc/keystone/
    with open('/etc/keystone/policy.json', 'w') as policyfile:
        json.dump(policy_dict, policyfile, sort_keys=True, indent=4, separators=(',', ': '))

    resp = HttpResponse()
    resp.status_code = 200
    return resp

def throwing_parse_check(rule):
    try:
        kind, match = rule.split(':', 1)
    except Exception:
        raise ValueError('Failed to understand rule %s', rule)

    # Find what implements the check
    extension_checks = _parser._checks.get_extensions()
    if kind in extension_checks:
        return extension_checks[kind](kind, match)
    elif kind in _parser._checks.registered_checks:
        return _parser._checks.registered_checks[kind](kind, match)
    elif None in _parser._checks.registered_checks:
        return _parser._checks.registered_checks[None](kind, match)
    else:
        raise ValueError('No handler for matches of kind %s', kind)

