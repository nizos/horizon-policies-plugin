from oslo_policy import generator

def get_policies():
    return generator.get_policies_dict(["keystone"])
