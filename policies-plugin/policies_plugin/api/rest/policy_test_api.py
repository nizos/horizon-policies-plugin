def get_text():
    list_of_policies = []
    with open('/opt/stack/horizon/horizon-policies-plugin/' +
        'policies-plugin/policies_plugin/api/rest/testFile.txt') as f:
        for line in f:
            list_of_policies.append([line.strip()])
    return list_of_policies
