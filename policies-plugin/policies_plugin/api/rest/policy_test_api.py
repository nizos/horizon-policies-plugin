from oslo_policy import generator

def get_text():
    policies = generator.get_policies_dict(["keystone"])
    return policies
