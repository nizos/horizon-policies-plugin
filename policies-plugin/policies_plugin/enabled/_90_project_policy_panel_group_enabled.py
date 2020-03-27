from django.utils.translation import ugettext_lazy as _

# The slug of the panel group to be added to HORIZON_CONFIG. Required.
PANEL_GROUP = 'policy'
# The display name of the PANEL_GROUP. Required.
PANEL_GROUP_NAME = _('Policy')
# The slug of the dashboard the PANEL_GROUP associated with. Required.
PANEL_GROUP_DASHBOARD = 'project'

ADD_INSTALLED_APPS = ['policies_plugin']

ADD_ANGULAR_MODULES = [
    'horizon.dashboard.project.policy'
]

ADD_JS_FILES = [
    'horizon/lib/angular/angular-route.js'
]

AUTO_DISCOVER_STATIC_FILES = True
