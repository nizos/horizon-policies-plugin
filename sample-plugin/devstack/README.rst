==========================================
Sample dashboard devstack plugin
==========================================

This directory contains the sample-dashboard devstack plugin.

To enable the plugin, add the following to your local.conf:

    enable_plugin sample-dashboard <sample-dashboard GITURL> 

where

    <sample-dashboard GITURL> is the URL of a sample-dashboard repository

For example:

    enable_plugin sample-dashboard https://github.com/doug-fish/sample-horizon-angular-plugin.git

Once you enable the plugin in your local.conf, ensure ``horizon`` is enabled.
