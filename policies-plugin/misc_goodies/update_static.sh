cd /opt/stack/horizon
cp ../policies-plugin/policies_plugin/enabled/_1485* openstack_dashboard/local/enabled/
python manage.py collectstatic --noinput
python manage.py compress --force
sudo service apache2 restart

