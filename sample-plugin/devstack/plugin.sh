function sample_dashboard_install {
    setup_develop $SAMPLE_DASHBOARD_DIR
}

function sample_dashboard_configure {
    cp $SAMPLE_DASHBOARD_ENABLE_FILE \
        $HORIZON_DIR/openstack_dashboard/local/enabled/
}

if is_service_enabled horizon; then
    if [[ "$1" == "stack" && "$2" == "install" ]]; then
        # Perform installation of service source
        echo_summary "Installing sample-dashboard"
        sample_dashboard_install
    elif [[ "$1" == "stack" && "$2" == "post-config" ]]; then
        echo_summary "Configuring sample-dashboard"
        sample_dashboard_configure
    elif [[ "$1" == "stack" && "$2" == "extra" ]]; then
        # Initialize and start the sample service
        echo_summary "Initializing sample-dashboard"
    fi
fi

if [[ "$1" == "unstack" ]]; then
    # Shut down sample dashboard services
    :
fi

if [[ "$1" == "clean" ]]; then
    # Remove state and transient data
    # Remember clean.sh first calls unstack.sh

    # Remove lbaas-dashboard enabled file and pyc
    rm -f ${SAMPLE_DASHBOARD_ENABLE_FILE}*
fi
