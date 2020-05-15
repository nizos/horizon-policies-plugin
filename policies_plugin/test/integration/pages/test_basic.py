#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.


from openstack_dashboard.test.integration_tests import helpers


class TestPoliciesPluginInstalled(helpers.TestCase):
    def test_policies_page_opened(self):
        policies_page = self.home_pg.go_to_identity_default_policies()
        self.assertEqual(policies_page.page_title,
                         'Policies - OpenStack Dashboard')
