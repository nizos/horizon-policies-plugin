# -*- coding: utf-8 -*-
# @Author: Nizar
# @Date:   2020-02-26 14:09:23
# @Last Modified by:   Nizar
# @Last Modified time: 2020-02-26 14:09:53
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

# from django.conf.urls import patterns
# from django.conf.urls import url

from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from horizon.browsers import views

# from sample_dashboard.dashboards.project.sample import views

title = _("Sample")
urlpatterns = [
    url('', views.AngularIndexView.as_view(title=title), name='index'),
]


# urlpatterns = patterns(
#     'sample_dashboard.dashboards.project.sample.views',
#     url('', views.IndexView.as_view(), name='index'),
# )
