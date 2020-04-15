from oslo_policy import generator, policy

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