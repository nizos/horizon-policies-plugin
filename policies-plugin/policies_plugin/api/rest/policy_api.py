from oslo_policy import generator

class Policy_API:

    def get_policies(self):
        return generator.get_policies_dict(["keystone"])
