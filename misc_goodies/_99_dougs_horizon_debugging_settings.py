# Drop this into /opt/stack/horizon/openstack_dashboard/local/local_settings.d
# to match the webroot expected by the Django web server in Horizon
# ./run_tests.sh -N --runserver 0.0.0.0:8081
# and to turn off static compression which is needed for javascript debug
# later you can just rename it so it doesn't end with .py to hide it from Horizon
WEBROOT="/"
COMPRESS_ENABLED=False
