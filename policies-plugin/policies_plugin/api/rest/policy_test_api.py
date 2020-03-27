from oslo_policy import generator

def get_text():
    policies = generator.get_policies_dict(["keystone"])
    #{namespace1: [rule_default_1, rule_default_2],
    # namespace2: [rule_default_3]...}
    #i = 1
    #list_of_policies = []
    #list_of_policies.append(policies.namespace1)
    #for policy in policies:
    #    list_of_policies.append(policy.namespace1)
    #    i += 1
    #return list_of_policies
    return policies
    #for section in sorted(policies.keys()):
    #    rule_defaults = policies[section]
    #    text = ('"%(name)s": "%(check_str)s"\n' %
    #                {'name': rule_defaults.name,
    #                'check_str': rule_defaults.check_str})
    #return text

    #list_of_policies = []
    #with open('/opt/stack/horizon/horizon-policies-plugin/' +
    #    'policies-plugin/policies_plugin/api/rest/testFile.txt') as f:
    #    for line in f:
    #        list_of_policies.append([line.strip()])
    #return list_of_policies
