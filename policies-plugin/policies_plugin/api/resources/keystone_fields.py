keystone_docs = {
    "admin_required": {
        "target":"admin_required",
        "default":"role:admin or is_admin:1",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "service_role": {
        "target":"service_role",
        "default":"role:service",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "service_or_admin": {
        "target":"service_or_admin",
        "default":"rule:admin_required or rule:service_role",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "owner": {
        "target":"owner",
        "default":"user_id:%(user_id)s",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "admin_or_owner": {
        "target":"admin_or_owner",
        "default":"rule:admin_required or rule:owner",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "token_subject": {
        "target":"token_subject",
        "default":"user_id:%(target.token.user_id)s",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "admin_or_token_subject": {
        "target":"admin_or_token_subject",
        "default":"rule:admin_required or rule:token_subject",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "service_admin_or_token_subject": {
        "target":"service_admin_or_token_subject",
        "default":"rule:service_or_admin or rule:token_subject",
        "scopes":[
            "None"
        ],
        "operations":[
            "None"
        ],
        "description":"None"
    },
    "identity:get_access_rule": {
        "target":"identity:get_access_rule",
        "default":"(role:reader and system_scope:all) or user_id:%(target.user.id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/access_rules/{access_rule_id}",
            "HEAD /v3/users/{user_id}/access_rules/{access_rule_id}"
        ],
        "description":"Show access rule details."
    },
    "identity:list_access_rules": {
        "target":"identity:list_access_rules",
        "default":"(role:reader and system_scope:all) or user_id:%(target.user.id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/access_rules",
            "HEAD /v3/users/{user_id}/access_rules"
        ],
        "description":"List access rules for a user."
    },
    "identity:delete_access_rule": {
        "target":"identity:delete_access_rule",
        "default":"(role:admin and system_scope:all) or user_id:%(target.user.id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "DELETE /v3/users/{user_id}/access_rules/{access_rule_id}"
        ],
        "description":"Delete an access_rule."
    },
    "identity:authorize_request_token": {
        "target":"identity:authorize_request_token",
        "default":"rule:admin_required",
        "scopes":[
            "project"
        ],
        "operations":[
            "PUT /v3/OS-OAUTH1/authorize/{request_token_id}"
        ],
        "description":"Authorize OAUTH1 request token."
    },
    "identity:get_access_token": {
        "target":"identity:get_access_token",
        "default":"rule:admin_required",
        "scopes":[
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/OS-OAUTH1/access_tokens/{access_token_id}"
        ],
        "description":"Get OAUTH1 access token for user by access token ID."
    },
    "identity:get_access_token_role": {
        "target":"identity:get_access_token_role",
        "default":"rule:admin_required",
        "scopes":[
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/OS-OAUTH1/access_tokens/{access_token_id}/roles/{role_id}"
        ],
        "description":"Get role for user OAUTH1 access token."
    },
    "identity:list_access_tokens": {
        "target":"identity:list_access_tokens",
        "default":"rule:admin_required",
        "scopes":[
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/OS-OAUTH1/access_tokens"
        ],
        "description":"List OAUTH1 access tokens for user."
    },
    "identity:list_access_token_roles": {
        "target":"identity:list_access_token_roles",
        "default":"rule:admin_required",
        "scopes":[
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/OS-OAUTH1/access_tokens/{access_token_id}/roles"
        ],
        "description":"List OAUTH1 access token roles."
    },
    "identity:delete_access_token": {
        "target":"identity:delete_access_token",
        "default":"rule:admin_required",
        "scopes":[
            "project"
        ],
        "operations":[
            "DELETE /v3/users/{user_id}/OS-OAUTH1/access_tokens/{access_token_id}"
        ],
        "description":"Delete OAUTH1 access token."
    },
    "identity:get_application_credential": {
        "target":"identity:get_application_credential",
        "default":"(role:reader and system_scope:all) or rule:owner",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/application_credentials/{application_credential_id}",
            "HEAD /v3/users/{user_id}/application_credentials/{application_credential_id}"
        ],
        "description":"Show application credential details."
    },
    "identity:list_application_credentials": {
        "target":"identity:list_application_credentials",
        "default":"(role:reader and system_scope:all) or rule:owner",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/application_credentials",
            "HEAD /v3/users/{user_id}/application_credentials"
        ],
        "description":"List application credentials for a user."
    },
    "identity:create_application_credential": {
        "target":"identity:create_application_credential",
        "default":"user_id:%(user_id)s",
        "scopes":[
            "project"
        ],
        "operations":[
            "POST /v3/users/{user_id}/application_credentials"
        ],
        "description":"Create an application credential."
    },
    "identity:delete_application_credential": {
        "target":"identity:delete_application_credential",
        "default":"(role:admin and system_scope:all) or rule:owner",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "DELETE /v3/users/{user_id}/application_credentials/{application_credential_id}"
        ],
        "description":"Delete an application credential."
    },
    "identity:get_auth_catalog": {
        "target":"identity:get_auth_catalog",
        "default":"",
        "scopes":[

        ],
        "operations":[
            "GET /v3/auth/catalog",
            "HEAD /v3/auth/catalog"
        ],
        "description":"Get service catalog."
    },
    "identity:get_auth_projects": {
        "target":"identity:get_auth_projects",
        "default":"",
        "scopes":[

        ],
        "operations":[
            "GET /v3/auth/projects",
            "HEAD /v3/auth/projects"
        ],
        "description":"List all projects a user has access to via role assignments."
    },
    "identity:get_auth_domains": {
        "target":"identity:get_auth_domains",
        "default":"",
        "scopes":[

        ],
        "operations":[
            "GET /v3/auth/domains",
            "HEAD /v3/auth/domains"
        ],
        "description":"List all domains a user has access to via role assignments."
    },
    "identity:get_auth_system": {
        "target":"identity:get_auth_system",
        "default":"",
        "scopes":[

        ],
        "operations":[
            "GET /v3/auth/system",
            "HEAD /v3/auth/system"
        ],
        "description":"List systems a user has access to via role assignments."
    },
    "identity:get_consumer": {
        "target":"identity:get_consumer",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-OAUTH1/consumers/{consumer_id}"
        ],
        "description":"Show OAUTH1 consumer details."
    },
    "identity:list_consumers": {
        "target":"identity:list_consumers",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-OAUTH1/consumers"
        ],
        "description":"List OAUTH1 consumers."
    },
    "identity:create_consumer": {
        "target":"identity:create_consumer",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/OS-OAUTH1/consumers"
        ],
        "description":"Create OAUTH1 consumer."
    },
    "identity:update_consumer": {
        "target":"identity:update_consumer",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/OS-OAUTH1/consumers/{consumer_id}"
        ],
        "description":"Update OAUTH1 consumer."
    },
    "identity:delete_consumer": {
        "target":"identity:delete_consumer",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-OAUTH1/consumers/{consumer_id}"
        ],
        "description":"Delete OAUTH1 consumer."
    },
    "identity:get_credential": {
        "target":"identity:get_credential",
        "default":"(role:reader and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/credentials/{credential_id}"
        ],
        "description":"Show credentials details."
    },
    "identity:list_credentials": {
        "target":"identity:list_credentials",
        "default":"(role:reader and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/credentials"
        ],
        "description":"List credentials."
    },
    "identity:create_credential": {
        "target":"identity:create_credential",
        "default":"(role:admin and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "POST /v3/credentials"
        ],
        "description":"Create credential."
    },
    "identity:update_credential": {
        "target":"identity:update_credential",
        "default":"(role:admin and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "PATCH /v3/credentials/{credential_id}"
        ],
        "description":"Update credential."
    },
    "identity:delete_credential": {
        "target":"identity:delete_credential",
        "default":"(role:admin and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "DELETE /v3/credentials/{credential_id}"
        ],
        "description":"Delete credential."
    },
    "identity:get_domain": {
        "target":"identity:get_domain",
        "default":"(role:reader and system_scope:all) or token.domain.id:%(target.domain.id)s or token.project.domain.id:%(target.domain.id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/domains/{domain_id}"
        ],
        "description":"Show domain details."
    },
    "identity:list_domains": {
        "target":"identity:list_domains",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/domains"
        ],
        "description":"List domains."
    },
    "identity:create_domain": {
        "target":"identity:create_domain",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/domains"
        ],
        "description":"Create domain."
    },
    "identity:update_domain": {
        "target":"identity:update_domain",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/domains/{domain_id}"
        ],
        "description":"Update domain."
    },
    "identity:delete_domain": {
        "target":"identity:delete_domain",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/domains/{domain_id}"
        ],
        "description":"Delete domain."
    },
    "identity:create_domain_config": {
        "target":"identity:create_domain_config",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/domains/{domain_id}/config"
        ],
        "description":"Create domain configuration."
    },
    "identity:get_domain_config": {
        "target":"identity:get_domain_config",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/domains/{domain_id}/config",
            "HEAD /v3/domains/{domain_id}/config",
            "GET /v3/domains/{domain_id}/config/{group}",
            "HEAD /v3/domains/{domain_id}/config/{group}",
            "GET /v3/domains/{domain_id}/config/{group}/{option}",
            "HEAD /v3/domains/{domain_id}/config/{group}/{option}"
        ],
        "description":"Get the entire domain configuration for a domain, an option group within a domain, or a specific configuration option within a group for a domain."
    },
    "identity:get_security_compliance_domain_config": {
        "target":"identity:get_security_compliance_domain_config",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/domains/{domain_id}/config/security_compliance",
            "HEAD /v3/domains/{domain_id}/config/security_compliance",
            "GET v3/domains/{domain_id}/config/security_compliance/{option}",
            "HEAD v3/domains/{domain_id}/config/security_compliance/{option}"
        ],
        "description":"Get security compliance domain configuration for either a domain or a specific option in a domain."
    },
    "identity:update_domain_config": {
        "target":"identity:update_domain_config",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/domains/{domain_id}/config",
            "PATCH /v3/domains/{domain_id}/config/{group}",
            "PATCH /v3/domains/{domain_id}/config/{group}/{option}"
        ],
        "description":"Update domain configuration for either a domain, specific group or a specific option in a group."
    },
    "identity:delete_domain_config": {
        "target":"identity:delete_domain_config",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/domains/{domain_id}/config",
            "DELETE /v3/domains/{domain_id}/config/{group}",
            "DELETE /v3/domains/{domain_id}/config/{group}/{option}"
        ],
        "description":"Delete domain configuration for either a domain, specific group or a specific option in a group."
    },
    "identity:get_domain_config_default": {
        "target":"identity:get_domain_config_default",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/domains/config/default",
            "HEAD /v3/domains/config/default",
            "GET /v3/domains/config/{group}/default",
            "HEAD /v3/domains/config/{group}/default",
            "GET /v3/domains/config/{group}/{option}/default",
            "HEAD /v3/domains/config/{group}/{option}/default"
        ],
        "description":"Get domain configuration default for either a domain, specific group or a specific option in a group."
    },
    "identity:ec2_get_credential": {
        "target":"identity:ec2_get_credential",
        "default":"(role:reader and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/credentials/OS-EC2/{credential_id}"
        ],
        "description":"Show ec2 credential details."
    },
    "identity:ec2_list_credentials": {
        "target":"identity:ec2_list_credentials",
        "default":"(role:reader and system_scope:all) or rule:owner",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/credentials/OS-EC2"
        ],
        "description":"List ec2 credentials."
    },
    "identity:ec2_create_credential": {
        "target":"identity:ec2_create_credential",
        "default":"(role:admin and system_scope:all) or rule:owner",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "POST /v3/users/{user_id}/credentials/OS-EC2"
        ],
        "description":"Create ec2 credential."
    },
    "identity:ec2_delete_credential": {
        "target":"identity:ec2_delete_credential",
        "default":"(role:admin and system_scope:all) or user_id:%(target.credential.user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "DELETE /v3/users/{user_id}/credentials/OS-EC2/{credential_id}"
        ],
        "description":"Delete ec2 credential."
    },
    "identity:get_endpoint": {
        "target":"identity:get_endpoint",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/endpoints/{endpoint_id}"
        ],
        "description":"Show endpoint details."
    },
    "identity:list_endpoints": {
        "target":"identity:list_endpoints",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/endpoints"
        ],
        "description":"List endpoints."
    },
    "identity:create_endpoint": {
        "target":"identity:create_endpoint",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/endpoints"
        ],
        "description":"Create endpoint."
    },
    "identity:update_endpoint": {
        "target":"identity:update_endpoint",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/endpoints/{endpoint_id}"
        ],
        "description":"Update endpoint."
    },
    "identity:delete_endpoint": {
        "target":"identity:delete_endpoint",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/endpoints/{endpoint_id}"
        ],
        "description":"Delete endpoint."
    },
    "identity:create_endpoint_group": {
        "target":"identity:create_endpoint_group",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/OS-EP-FILTER/endpoint_groups"
        ],
        "description":"Create endpoint group."
    },
    "identity:list_endpoint_groups": {
        "target":"identity:list_endpoint_groups",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/endpoint_groups"
        ],
        "description":"List endpoint groups."
    },
    "identity:get_endpoint_group": {
        "target":"identity:get_endpoint_group",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}",
            "HEAD /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}"
        ],
        "description":"Get endpoint group."
    },
    "identity:update_endpoint_group": {
        "target":"identity:update_endpoint_group",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}"
        ],
        "description":"Update endpoint group."
    },
    "identity:delete_endpoint_group": {
        "target":"identity:delete_endpoint_group",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}"
        ],
        "description":"Delete endpoint group."
    },
    "identity:list_projects_associated_with_endpoint_group": {
        "target":"identity:list_projects_associated_with_endpoint_group",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}/projects"
        ],
        "description":"List all projects associated with a specific endpoint group."
    },
    "identity:list_endpoints_associated_with_endpoint_group": {
        "target":"identity:list_endpoints_associated_with_endpoint_group",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}/endpoints"
        ],
        "description":"List all endpoints associated with an endpoint group."
    },
    "identity:get_endpoint_group_in_project": {
        "target":"identity:get_endpoint_group_in_project",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}/projects/{project_id}",
            "HEAD /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}/projects/{project_id}"
        ],
        "description":"Check if an endpoint group is associated with a project."
    },
    "identity:list_endpoint_groups_for_project": {
        "target":"identity:list_endpoint_groups_for_project",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/projects/{project_id}/endpoint_groups"
        ],
        "description":"List endpoint groups associated with a specific project."
    },
    "identity:add_endpoint_group_to_project": {
        "target":"identity:add_endpoint_group_to_project",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}/projects/{project_id}"
        ],
        "description":"Allow a project to access an endpoint group."
    },
    "identity:remove_endpoint_group_from_project": {
        "target":"identity:remove_endpoint_group_from_project",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-EP-FILTER/endpoint_groups/{endpoint_group_id}/projects/{project_id}"
        ],
        "description":"Remove endpoint group from project."
    },
    "identity:check_grant": {
        "target":"identity:check_grant",
        "default":"(role:reader and system_scope:all) or ((role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)) and (domain_id:%(target.role.domain_id)s or None:%(target.role.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "HEAD /v3/projects/{project_id}/users/{user_id}/roles/{role_id}",
            "GET /v3/projects/{project_id}/users/{user_id}/roles/{role_id}",
            "HEAD /v3/projects/{project_id}/groups/{group_id}/roles/{role_id}",
            "GET /v3/projects/{project_id}/groups/{group_id}/roles/{role_id}",
            "HEAD /v3/domains/{domain_id}/users/{user_id}/roles/{role_id}",
            "GET /v3/domains/{domain_id}/users/{user_id}/roles/{role_id}",
            "HEAD /v3/domains/{domain_id}/groups/{group_id}/roles/{role_id}",
            "GET /v3/domains/{domain_id}/groups/{group_id}/roles/{role_id}",
            "HEAD /v3/OS-INHERIT/projects/{project_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "GET /v3/OS-INHERIT/projects/{project_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "HEAD /v3/OS-INHERIT/projects/{project_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects",
            "GET /v3/OS-INHERIT/projects/{project_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects",
            "HEAD /v3/OS-INHERIT/domains/{domain_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "GET /v3/OS-INHERIT/domains/{domain_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "HEAD /v3/OS-INHERIT/domains/{domain_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects",
            "GET /v3/OS-INHERIT/domains/{domain_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects"
        ],
        "description":"Check a role grant between a target and an actor. A target can be either a domain or a project. An actor can be either a user or a group. These terms also apply to the OS-INHERIT APIs, where grants on the target are inherited to all projects in the subtree, if applicable."
    },
    "identity:list_grants": {
        "target":"identity:list_grants",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/projects/{project_id}/users/{user_id}/roles",
            "HEAD /v3/projects/{project_id}/users/{user_id}/roles",
            "GET /v3/projects/{project_id}/groups/{group_id}/roles",
            "HEAD /v3/projects/{project_id}/groups/{group_id}/roles",
            "GET /v3/domains/{domain_id}/users/{user_id}/roles",
            "HEAD /v3/domains/{domain_id}/users/{user_id}/roles",
            "GET /v3/domains/{domain_id}/groups/{group_id}/roles",
            "HEAD /v3/domains/{domain_id}/groups/{group_id}/roles",
            "GET /v3/OS-INHERIT/domains/{domain_id}/groups/{group_id}/roles/inherited_to_projects",
            "GET /v3/OS-INHERIT/domains/{domain_id}/users/{user_id}/roles/inherited_to_projects"
        ],
        "description":"List roles granted to an actor on a target. A target can be either a domain or a project. An actor can be either a user or a group. For the OS-INHERIT APIs, it is possible to list inherited role grants for actors on domains, where grants are inherited to all projects in the specified domain."
    },
    "identity:create_grant": {
        "target":"identity:create_grant",
        "default":"(role:admin and system_scope:all) or ((role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)) and (domain_id:%(target.role.domain_id)s or None:%(target.role.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "PUT /v3/projects/{project_id}/users/{user_id}/roles/{role_id}",
            "PUT /v3/projects/{project_id}/groups/{group_id}/roles/{role_id}",
            "PUT /v3/domains/{domain_id}/users/{user_id}/roles/{role_id}",
            "PUT /v3/domains/{domain_id}/groups/{group_id}/roles/{role_id}",
            "PUT /v3/OS-INHERIT/projects/{project_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "PUT /v3/OS-INHERIT/projects/{project_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects",
            "PUT /v3/OS-INHERIT/domains/{domain_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "PUT /v3/OS-INHERIT/domains/{domain_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects"
        ],
        "description":"Create a role grant between a target and an actor. A target can be either a domain or a project. An actor can be either a user or a group. These terms also apply to the OS-INHERIT APIs, where grants on the target are inherited to all projects in the subtree, if applicable."
    },
    "identity:revoke_grant": {
        "target":"identity:revoke_grant",
        "default":"(role:admin and system_scope:all) or ((role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)) and (domain_id:%(target.role.domain_id)s or None:%(target.role.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "DELETE /v3/projects/{project_id}/users/{user_id}/roles/{role_id}",
            "DELETE /v3/projects/{project_id}/groups/{group_id}/roles/{role_id}",
            "DELETE /v3/domains/{domain_id}/users/{user_id}/roles/{role_id}",
            "DELETE /v3/domains/{domain_id}/groups/{group_id}/roles/{role_id}",
            "DELETE /v3/OS-INHERIT/projects/{project_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "DELETE /v3/OS-INHERIT/projects/{project_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects",
            "DELETE /v3/OS-INHERIT/domains/{domain_id}/users/{user_id}/roles/{role_id}/inherited_to_projects",
            "DELETE /v3/OS-INHERIT/domains/{domain_id}/groups/{group_id}/roles/{role_id}/inherited_to_projects"
        ],
        "description":"\"Revoke a role grant between a target and an actor. A target can be either a domain or a project. An actor can be either a user or a group. These terms also apply to the OS-INHERIT APIs, where grants on the target are inherited to all projects in the subtree, if applicable. In that case, revoking the role grant in the target would remove the logical effect of inheriting it to the target\\'s projects subtree.\""
    },
    "identity:list_system_grants_for_user": {
        "target":"identity:list_system_grants_for_user",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['HEAD', 'GET'] /v3/system/users/{user_id}/roles"
        ],
        "description":"List all grants a specific user has on the system."
    },
    "identity:check_system_grant_for_user": {
        "target":"identity:check_system_grant_for_user",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['HEAD', 'GET'] /v3/system/users/{user_id}/roles/{role_id}"
        ],
        "description":"Check if a user has a role on the system."
    },
    "identity:create_system_grant_for_user": {
        "target":"identity:create_system_grant_for_user",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['PUT'] /v3/system/users/{user_id}/roles/{role_id}"
        ],
        "description":"Grant a user a role on the system."
    },
    "identity:revoke_system_grant_for_user": {
        "target":"identity:revoke_system_grant_for_user",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['DELETE'] /v3/system/users/{user_id}/roles/{role_id}"
        ],
        "description":"Remove a role from a user on the system."
    },
    "identity:list_system_grants_for_group": {
        "target":"identity:list_system_grants_for_group",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['HEAD', 'GET'] /v3/system/groups/{group_id}/roles"
        ],
        "description":"List all grants a specific group has on the system."
    },
    "identity:check_system_grant_for_group": {
        "target":"identity:check_system_grant_for_group",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['HEAD', 'GET'] /v3/system/groups/{group_id}/roles/{role_id}"
        ],
        "description":"Check if a group has a role on the system."
    },
    "identity:create_system_grant_for_group": {
        "target":"identity:create_system_grant_for_group",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['PUT'] /v3/system/groups/{group_id}/roles/{role_id}"
        ],
        "description":"Grant a group a role on the system."
    },
    "identity:revoke_system_grant_for_group": {
        "target":"identity:revoke_system_grant_for_group",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "['DELETE'] /v3/system/groups/{group_id}/roles/{role_id}"
        ],
        "description":"Remove a role from a group on the system."
    },
    "identity:get_group": {
        "target":"identity:get_group",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/groups/{group_id}",
            "HEAD /v3/groups/{group_id}"
        ],
        "description":"Show group details."
    },
    "identity:list_groups": {
        "target":"identity:list_groups",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/groups",
            "HEAD /v3/groups"
        ],
        "description":"List groups."
    },
    "identity:list_groups_for_user": {
        "target":"identity:list_groups_for_user",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.user.domain_id)s) or user_id:%(user_id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/groups",
            "HEAD /v3/users/{user_id}/groups"
        ],
        "description":"List groups to which a user belongs."
    },
    "identity:create_group": {
        "target":"identity:create_group",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "POST /v3/groups"
        ],
        "description":"Create group."
    },
    "identity:update_group": {
        "target":"identity:update_group",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "PATCH /v3/groups/{group_id}"
        ],
        "description":"Update group."
    },
    "identity:delete_group": {
        "target":"identity:delete_group",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "DELETE /v3/groups/{group_id}"
        ],
        "description":"Delete group."
    },
    "identity:list_users_in_group": {
        "target":"identity:list_users_in_group",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/groups/{group_id}/users",
            "HEAD /v3/groups/{group_id}/users"
        ],
        "description":"List members of a specific group."
    },
    "identity:remove_user_from_group": {
        "target":"identity:remove_user_from_group",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.user.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "DELETE /v3/groups/{group_id}/users/{user_id}"
        ],
        "description":"Remove user from group."
    },
    "identity:check_user_in_group": {
        "target":"identity:check_user_in_group",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.user.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "HEAD /v3/groups/{group_id}/users/{user_id}",
            "GET /v3/groups/{group_id}/users/{user_id}"
        ],
        "description":"Check whether a user is a member of a group."
    },
    "identity:add_user_to_group": {
        "target":"identity:add_user_to_group",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.user.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "PUT /v3/groups/{group_id}/users/{user_id}"
        ],
        "description":"Add user to group."
    },
    "identity:create_identity_provider": {
        "target":"identity:create_identity_provider",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/OS-FEDERATION/identity_providers/{idp_id}"
        ],
        "description":"Create identity provider."
    },
    "identity:list_identity_providers": {
        "target":"identity:list_identity_providers",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/identity_providers",
            "HEAD /v3/OS-FEDERATION/identity_providers"
        ],
        "description":"List identity providers."
    },
    "identity:get_identity_provider": {
        "target":"identity:get_identity_provider",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/identity_providers/{idp_id}",
            "HEAD /v3/OS-FEDERATION/identity_providers/{idp_id}"
        ],
        "description":"Get identity provider."
    },
    "identity:update_identity_provider": {
        "target":"identity:update_identity_provider",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/OS-FEDERATION/identity_providers/{idp_id}"
        ],
        "description":"Update identity provider."
    },
    "identity:delete_identity_provider": {
        "target":"identity:delete_identity_provider",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-FEDERATION/identity_providers/{idp_id}"
        ],
        "description":"Delete identity provider."
    },
    "identity:get_implied_role": {
        "target":"identity:get_implied_role",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/roles/{prior_role_id}/implies/{implied_role_id}"
        ],
        "description":"Get information about an association between two roles. When a relationship exists between a prior role and an implied role and the prior role is assigned to a user, the user also assumes the implied role."
    },
    "identity:list_implied_roles": {
        "target":"identity:list_implied_roles",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/roles/{prior_role_id}/implies",
            "HEAD /v3/roles/{prior_role_id}/implies"
        ],
        "description":"List associations between two roles. When a relationship exists between a prior role and an implied role and the prior role is assigned to a user, the user also assumes the implied role. This will return all the implied roles that would be assumed by the user who gets the specified prior role."
    },
    "identity:create_implied_role": {
        "target":"identity:create_implied_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/roles/{prior_role_id}/implies/{implied_role_id}"
        ],
        "description":"Create an association between two roles. When a relationship exists between a prior role and an implied role and the prior role is assigned to a user, the user also assumes the implied role."
    },
    "identity:delete_implied_role": {
        "target":"identity:delete_implied_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/roles/{prior_role_id}/implies/{implied_role_id}"
        ],
        "description":"Delete the association between two roles. When a relationship exists between a prior role and an implied role and the prior role is assigned to a user, the user also assumes the implied role. Removing the association will cause that effect to be eliminated."
    },
    "identity:list_role_inference_rules": {
        "target":"identity:list_role_inference_rules",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/role_inferences",
            "HEAD /v3/role_inferences"
        ],
        "description":"List all associations between two roles in the system. When a relationship exists between a prior role and an implied role and the prior role is assigned to a user, the user also assumes the implied role."
    },
    "identity:check_implied_role": {
        "target":"identity:check_implied_role",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "HEAD /v3/roles/{prior_role_id}/implies/{implied_role_id}"
        ],
        "description":"Check an association between two roles. When a relationship exists between a prior role and an implied role and the prior role is assigned to a user, the user also assumes the implied role."
    },
    "identity:get_limit_model": {
        "target":"identity:get_limit_model",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/limits/model",
            "HEAD /v3/limits/model"
        ],
        "description":"Get limit enforcement model."
    },
    "identity:get_limit": {
        "target":"identity:get_limit",
        "default":"(role:reader and system_scope:all) or (domain_id:%(target.limit.domain.id)s or domain_id:%(target.limit.project.domain_id)s) or (project_id:%(target.limit.project_id)s and not None:%(target.limit.project_id)s)",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/limits/{limit_id}",
            "HEAD /v3/limits/{limit_id}"
        ],
        "description":"Show limit details."
    },
    "identity:list_limits": {
        "target":"identity:list_limits",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/limits",
            "HEAD /v3/limits"
        ],
        "description":"List limits."
    },
    "identity:create_limits": {
        "target":"identity:create_limits",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/limits"
        ],
        "description":"Create limits."
    },
    "identity:update_limit": {
        "target":"identity:update_limit",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/limits/{limit_id}"
        ],
        "description":"Update limit."
    },
    "identity:delete_limit": {
        "target":"identity:delete_limit",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/limits/{limit_id}"
        ],
        "description":"Delete limit."
    },
    "identity:create_mapping": {
        "target":"identity:create_mapping",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/OS-FEDERATION/mappings/{mapping_id}"
        ],
        "description":"Create a new federated mapping containing one or more sets of rules."
    },
    "identity:get_mapping": {
        "target":"identity:get_mapping",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/mappings/{mapping_id}",
            "HEAD /v3/OS-FEDERATION/mappings/{mapping_id}"
        ],
        "description":"Get a federated mapping."
    },
    "identity:list_mappings": {
        "target":"identity:list_mappings",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/mappings",
            "HEAD /v3/OS-FEDERATION/mappings"
        ],
        "description":"List federated mappings."
    },
    "identity:delete_mapping": {
        "target":"identity:delete_mapping",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-FEDERATION/mappings/{mapping_id}"
        ],
        "description":"Delete a federated mapping."
    },
    "identity:update_mapping": {
        "target":"identity:update_mapping",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/OS-FEDERATION/mappings/{mapping_id}"
        ],
        "description":"Update a federated mapping."
    },
    "identity:get_policy": {
        "target":"identity:get_policy",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/policies/{policy_id}"
        ],
        "description":"Show policy details."
    },
    "identity:list_policies": {
        "target":"identity:list_policies",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/policies"
        ],
        "description":"List policies."
    },
    "identity:create_policy": {
        "target":"identity:create_policy",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/policies"
        ],
        "description":"Create policy."
    },
    "identity:update_policy": {
        "target":"identity:update_policy",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/policies/{policy_id}"
        ],
        "description":"Update policy."
    },
    "identity:delete_policy": {
        "target":"identity:delete_policy",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/policies/{policy_id}"
        ],
        "description":"Delete policy."
    },
    "identity:create_policy_association_for_endpoint": {
        "target":"identity:create_policy_association_for_endpoint",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/endpoints/{endpoint_id}"
        ],
        "description":"Associate a policy to a specific endpoint."
    },
    "identity:check_policy_association_for_endpoint": {
        "target":"identity:check_policy_association_for_endpoint",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/endpoints/{endpoint_id}",
            "HEAD /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/endpoints/{endpoint_id}"
        ],
        "description":"Check policy association for endpoint."
    },
    "identity:delete_policy_association_for_endpoint": {
        "target":"identity:delete_policy_association_for_endpoint",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/endpoints/{endpoint_id}"
        ],
        "description":"Delete policy association for endpoint."
    },
    "identity:create_policy_association_for_service": {
        "target":"identity:create_policy_association_for_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}"
        ],
        "description":"Associate a policy to a specific service."
    },
    "identity:check_policy_association_for_service": {
        "target":"identity:check_policy_association_for_service",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}",
            "HEAD /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}"
        ],
        "description":"Check policy association for service."
    },
    "identity:delete_policy_association_for_service": {
        "target":"identity:delete_policy_association_for_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}"
        ],
        "description":"Delete policy association for service."
    },
    "identity:create_policy_association_for_region_and_service": {
        "target":"identity:create_policy_association_for_region_and_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}/regions/{region_id}"
        ],
        "description":"Associate a policy to a specific region and service combination."
    },
    "identity:check_policy_association_for_region_and_service": {
        "target":"identity:check_policy_association_for_region_and_service",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}/regions/{region_id}",
            "HEAD /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}/regions/{region_id}"
        ],
        "description":"Check policy association for region and service."
    },
    "identity:delete_policy_association_for_region_and_service": {
        "target":"identity:delete_policy_association_for_region_and_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/services/{service_id}/regions/{region_id}"
        ],
        "description":"Delete policy association for region and service."
    },
    "identity:get_policy_for_endpoint": {
        "target":"identity:get_policy_for_endpoint",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/endpoints/{endpoint_id}/OS-ENDPOINT-POLICY/policy",
            "HEAD /v3/endpoints/{endpoint_id}/OS-ENDPOINT-POLICY/policy"
        ],
        "description":"Get policy for endpoint."
    },
    "identity:list_endpoints_for_policy": {
        "target":"identity:list_endpoints_for_policy",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/policies/{policy_id}/OS-ENDPOINT-POLICY/endpoints"
        ],
        "description":"List endpoints for policy."
    },
    "identity:get_project": {
        "target":"identity:get_project",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.project.domain_id)s) or project_id:%(target.project.id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/projects/{project_id}"
        ],
        "description":"Show project details."
    },
    "identity:list_projects": {
        "target":"identity:list_projects",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/projects"
        ],
        "description":"List projects."
    },
    "identity:list_user_projects": {
        "target":"identity:list_user_projects",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.user.domain_id)s) or user_id:%(target.user.id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}/projects"
        ],
        "description":"List projects for user."
    },
    "identity:create_project": {
        "target":"identity:create_project",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "POST /v3/projects"
        ],
        "description":"Create project."
    },
    "identity:update_project": {
        "target":"identity:update_project",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "PATCH /v3/projects/{project_id}"
        ],
        "description":"Update project."
    },
    "identity:delete_project": {
        "target":"identity:delete_project",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "DELETE /v3/projects/{project_id}"
        ],
        "description":"Delete project."
    },
    "identity:list_project_tags": {
        "target":"identity:list_project_tags",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.project.domain_id)s) or project_id:%(target.project.id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/projects/{project_id}/tags",
            "HEAD /v3/projects/{project_id}/tags"
        ],
        "description":"List tags for a project."
    },
    "identity:get_project_tag": {
        "target":"identity:get_project_tag",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.project.domain_id)s) or project_id:%(target.project.id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/projects/{project_id}/tags/{value}",
            "HEAD /v3/projects/{project_id}/tags/{value}"
        ],
        "description":"Check if project contains a tag."
    },
    "identity:update_project_tags": {
        "target":"identity:update_project_tags",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s) or (role:admin and project_id:%(target.project.id)s)",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "PUT /v3/projects/{project_id}/tags"
        ],
        "description":"Replace all tags on a project with the new set of tags."
    },
    "identity:create_project_tag": {
        "target":"identity:create_project_tag",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s) or (role:admin and project_id:%(target.project.id)s)",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "PUT /v3/projects/{project_id}/tags/{value}"
        ],
        "description":"Add a single tag to a project."
    },
    "identity:delete_project_tags": {
        "target":"identity:delete_project_tags",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s) or (role:admin and project_id:%(target.project.id)s)",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "DELETE /v3/projects/{project_id}/tags"
        ],
        "description":"Remove all tags from a project."
    },
    "identity:delete_project_tag": {
        "target":"identity:delete_project_tag",
        "default":"(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s) or (role:admin and project_id:%(target.project.id)s)",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "DELETE /v3/projects/{project_id}/tags/{value}"
        ],
        "description":"Delete a specified tag from project."
    },
    "identity:list_projects_for_endpoint": {
        "target":"identity:list_projects_for_endpoint",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/endpoints/{endpoint_id}/projects"
        ],
        "description":"List projects allowed to access an endpoint."
    },
    "identity:add_endpoint_to_project": {
        "target":"identity:add_endpoint_to_project",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/OS-EP-FILTER/projects/{project_id}/endpoints/{endpoint_id}"
        ],
        "description":"Allow project to access an endpoint."
    },
    "identity:check_endpoint_in_project": {
        "target":"identity:check_endpoint_in_project",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/projects/{project_id}/endpoints/{endpoint_id}",
            "HEAD /v3/OS-EP-FILTER/projects/{project_id}/endpoints/{endpoint_id}"
        ],
        "description":"Check if a project is allowed to access an endpoint."
    },
    "identity:list_endpoints_for_project": {
        "target":"identity:list_endpoints_for_project",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-EP-FILTER/projects/{project_id}/endpoints"
        ],
        "description":"List the endpoints a project is allowed to access."
    },
    "identity:remove_endpoint_from_project": {
        "target":"identity:remove_endpoint_from_project",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-EP-FILTER/projects/{project_id}/endpoints/{endpoint_id}"
        ],
        "description":"Remove access to an endpoint from a project that has previously been given explicit access."
    },
    "identity:create_protocol": {
        "target":"identity:create_protocol",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/OS-FEDERATION/identity_providers/{idp_id}/protocols/{protocol_id}"
        ],
        "description":"Create federated protocol."
    },
    "identity:update_protocol": {
        "target":"identity:update_protocol",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/OS-FEDERATION/identity_providers/{idp_id}/protocols/{protocol_id}"
        ],
        "description":"Update federated protocol."
    },
    "identity:get_protocol": {
        "target":"identity:get_protocol",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/identity_providers/{idp_id}/protocols/{protocol_id}"
        ],
        "description":"Get federated protocol."
    },
    "identity:list_protocols": {
        "target":"identity:list_protocols",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/identity_providers/{idp_id}/protocols"
        ],
        "description":"List federated protocols."
    },
    "identity:delete_protocol": {
        "target":"identity:delete_protocol",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-FEDERATION/identity_providers/{idp_id}/protocols/{protocol_id}"
        ],
        "description":"Delete federated protocol."
    },
    "identity:get_region": {
        "target":"identity:get_region",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/regions/{region_id}",
            "HEAD /v3/regions/{region_id}"
        ],
        "description":"Show region details."
    },
    "identity:list_regions": {
        "target":"identity:list_regions",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/regions",
            "HEAD /v3/regions"
        ],
        "description":"List regions."
    },
    "identity:create_region": {
        "target":"identity:create_region",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/regions",
            "PUT /v3/regions/{region_id}"
        ],
        "description":"Create region."
    },
    "identity:update_region": {
        "target":"identity:update_region",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/regions/{region_id}"
        ],
        "description":"Update region."
    },
    "identity:delete_region": {
        "target":"identity:delete_region",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/regions/{region_id}"
        ],
        "description":"Delete region."
    },
    "identity:get_registered_limit": {
        "target":"identity:get_registered_limit",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/registered_limits/{registered_limit_id}",
            "HEAD /v3/registered_limits/{registered_limit_id}"
        ],
        "description":"Show registered limit details."
    },
    "identity:list_registered_limits": {
        "target":"identity:list_registered_limits",
        "default":"",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/registered_limits",
            "HEAD /v3/registered_limits"
        ],
        "description":"List registered limits."
    },
    "identity:create_registered_limits": {
        "target":"identity:create_registered_limits",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/registered_limits"
        ],
        "description":"Create registered limits."
    },
    "identity:update_registered_limit": {
        "target":"identity:update_registered_limit",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/registered_limits/{registered_limit_id}"
        ],
        "description":"Update registered limit."
    },
    "identity:delete_registered_limit": {
        "target":"identity:delete_registered_limit",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/registered_limits/{registered_limit_id}"
        ],
        "description":"Delete registered limit."
    },
    "identity:list_revoke_events": {
        "target":"identity:list_revoke_events",
        "default":"rule:service_or_admin",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-REVOKE/events"
        ],
        "description":"List revocation events."
    },
    "identity:get_role": {
        "target":"identity:get_role",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/roles/{role_id}",
            "HEAD /v3/roles/{role_id}"
        ],
        "description":"Show role details."
    },
    "identity:list_roles": {
        "target":"identity:list_roles",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/roles",
            "HEAD /v3/roles"
        ],
        "description":"List roles."
    },
    "identity:create_role": {
        "target":"identity:create_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/roles"
        ],
        "description":"Create role."
    },
    "identity:update_role": {
        "target":"identity:update_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/roles/{role_id}"
        ],
        "description":"Update role."
    },
    "identity:delete_role": {
        "target":"identity:delete_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/roles/{role_id}"
        ],
        "description":"Delete role."
    },
    "identity:get_domain_role": {
        "target":"identity:get_domain_role",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/roles/{role_id}",
            "HEAD /v3/roles/{role_id}"
        ],
        "description":"Show domain role."
    },
    "identity:list_domain_roles": {
        "target":"identity:list_domain_roles",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/roles?domain_id={domain_id}",
            "HEAD /v3/roles?domain_id={domain_id}"
        ],
        "description":"List domain roles."
    },
    "identity:create_domain_role": {
        "target":"identity:create_domain_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/roles"
        ],
        "description":"Create domain role."
    },
    "identity:update_domain_role": {
        "target":"identity:update_domain_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/roles/{role_id}"
        ],
        "description":"Update domain role."
    },
    "identity:delete_domain_role": {
        "target":"identity:delete_domain_role",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/roles/{role_id}"
        ],
        "description":"Delete domain role."
    },
    "identity:list_role_assignments": {
        "target":"identity:list_role_assignments",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/role_assignments",
            "HEAD /v3/role_assignments"
        ],
        "description":"List role assignments."
    },
    "identity:list_role_assignments_for_tree": {
        "target":"identity:list_role_assignments_for_tree",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.project.domain_id)s) or (role:admin and project_id:%(target.project.id)s)",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/role_assignments?include_subtree",
            "HEAD /v3/role_assignments?include_subtree"
        ],
        "description":"List all role assignments for a given tree of hierarchical projects."
    },
    "identity:get_service": {
        "target":"identity:get_service",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/services/{service_id}"
        ],
        "description":"Show service details."
    },
    "identity:list_services": {
        "target":"identity:list_services",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/services"
        ],
        "description":"List services."
    },
    "identity:create_service": {
        "target":"identity:create_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "POST /v3/services"
        ],
        "description":"Create service."
    },
    "identity:update_service": {
        "target":"identity:update_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/services/{service_id}"
        ],
        "description":"Update service."
    },
    "identity:delete_service": {
        "target":"identity:delete_service",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/services/{service_id}"
        ],
        "description":"Delete service."
    },
    "identity:create_service_provider": {
        "target":"identity:create_service_provider",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PUT /v3/OS-FEDERATION/service_providers/{service_provider_id}"
        ],
        "description":"Create federated service provider."
    },
    "identity:list_service_providers": {
        "target":"identity:list_service_providers",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/service_providers",
            "HEAD /v3/OS-FEDERATION/service_providers"
        ],
        "description":"List federated service providers."
    },
    "identity:get_service_provider": {
        "target":"identity:get_service_provider",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-FEDERATION/service_providers/{service_provider_id}",
            "HEAD /v3/OS-FEDERATION/service_providers/{service_provider_id}"
        ],
        "description":"Get federated service provider."
    },
    "identity:update_service_provider": {
        "target":"identity:update_service_provider",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "PATCH /v3/OS-FEDERATION/service_providers/{service_provider_id}"
        ],
        "description":"Update federated service provider."
    },
    "identity:delete_service_provider": {
        "target":"identity:delete_service_provider",
        "default":"role:admin and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "DELETE /v3/OS-FEDERATION/service_providers/{service_provider_id}"
        ],
        "description":"Delete federated service provider."
    },
    "identity:revocation_list": {
        "target":"identity:revocation_list",
        "default":"rule:service_or_admin",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/auth/tokens/OS-PKI/revoked"
        ],
        "description":"List revoked PKI tokens."
    },
    "identity:check_token": {
        "target":"identity:check_token",
        "default":"(role:reader and system_scope:all) or rule:token_subject",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "HEAD /v3/auth/tokens"
        ],
        "description":"Check a token."
    },
    "identity:validate_token": {
        "target":"identity:validate_token",
        "default":"(role:reader and system_scope:all) or rule:service_role or rule:token_subject",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/auth/tokens"
        ],
        "description":"Validate a token."
    },
    "identity:revoke_token": {
        "target":"identity:revoke_token",
        "default":"(role:admin and system_scope:all) or rule:token_subject",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "DELETE /v3/auth/tokens"
        ],
        "description":"Revoke a token."
    },
    "identity:create_trust": {
        "target":"identity:create_trust",
        "default":"user_id:%(trust.trustor_user_id)s",
        "scopes":[
            "project"
        ],
        "operations":[
            "POST /v3/OS-TRUST/trusts"
        ],
        "description":"Create trust."
    },
    "identity:list_trusts": {
        "target":"identity:list_trusts",
        "default":"role:reader and system_scope:all",
        "scopes":[
            "system"
        ],
        "operations":[
            "GET /v3/OS-TRUST/trusts",
            "HEAD /v3/OS-TRUST/trusts"
        ],
        "description":"List trusts."
    },
    "identity:list_trusts_for_trustor": {
        "target":"identity:list_trusts_for_trustor",
        "default":"role:reader and system_scope:all or user_id:%(target.trust.trustor_user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/OS-TRUST/trusts?trustor_user_id={trustor_user_id}",
            "HEAD /v3/OS-TRUST/trusts?trustor_user_id={trustor_user_id}"
        ],
        "description":"List trusts for trustor."
    },
    "identity:list_trusts_for_trustee": {
        "target":"identity:list_trusts_for_trustee",
        "default":"role:reader and system_scope:all or user_id:%(target.trust.trustee_user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/OS-TRUST/trusts?trustee_user_id={trustee_user_id}",
            "HEAD /v3/OS-TRUST/trusts?trustee_user_id={trustee_user_id}"
        ],
        "description":"List trusts for trustee."
    },
    "identity:list_roles_for_trust": {
        "target":"identity:list_roles_for_trust",
        "default":"role:reader and system_scope:all or user_id:%(target.trust.trustor_user_id)s or user_id:%(target.trust.trustee_user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/OS-TRUST/trusts/{trust_id}/roles",
            "HEAD /v3/OS-TRUST/trusts/{trust_id}/roles"
        ],
        "description":"List roles delegated by a trust."
    },
    "identity:get_role_for_trust": {
        "target":"identity:get_role_for_trust",
        "default":"role:reader and system_scope:all or user_id:%(target.trust.trustor_user_id)s or user_id:%(target.trust.trustee_user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/OS-TRUST/trusts/{trust_id}/roles/{role_id}",
            "HEAD /v3/OS-TRUST/trusts/{trust_id}/roles/{role_id}"
        ],
        "description":"Check if trust delegates a particular role."
    },
    "identity:delete_trust": {
        "target":"identity:delete_trust",
        "default":"role:admin and system_scope:all or user_id:%(target.trust.trustor_user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "DELETE /v3/OS-TRUST/trusts/{trust_id}"
        ],
        "description":"Revoke trust."
    },
    "identity:get_trust": {
        "target":"identity:get_trust",
        "default":"role:reader and system_scope:all or user_id:%(target.trust.trustor_user_id)s or user_id:%(target.trust.trustee_user_id)s",
        "scopes":[
            "system",
            "project"
        ],
        "operations":[
            "GET /v3/OS-TRUST/trusts/{trust_id}",
            "HEAD /v3/OS-TRUST/trusts/{trust_id}"
        ],
        "description":"Get trust."
    },
    "identity:get_user": {
        "target":"identity:get_user",
        "default":"(role:reader and system_scope:all) or (role:reader and token.domain.id:%(target.user.domain_id)s) or user_id:%(target.user.id)s",
        "scopes":[
            "system",
            "domain",
            "project"
        ],
        "operations":[
            "GET /v3/users/{user_id}",
            "HEAD /v3/users/{user_id}"
        ],
        "description":"Show user details."
    },
    "identity:list_users": {
        "target":"identity:list_users",
        "default":"(role:reader and system_scope:all) or (role:reader and domain_id:%(target.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "GET /v3/users",
            "HEAD /v3/users"
        ],
        "description":"List users."
    },
    "identity:list_projects_for_user": {
        "target":"identity:list_projects_for_user",
        "default":"",
        "scopes":[

        ],
        "operations":[
            "GET  /v3/auth/projects"
        ],
        "description":"List all projects a user has access to via role assignments."
    },
    "identity:list_domains_for_user": {
        "target":"identity:list_domains_for_user",
        "default":"",
        "scopes":[

        ],
        "operations":[
            "GET /v3/auth/domains"
        ],
        "description":"List all domains a user has access to via role assignments."
    },
    "identity:create_user": {
        "target":"identity:create_user",
        "default":"(role:admin and system_scope:all) or (role:admin and token.domain.id:%(target.user.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "POST /v3/users"
        ],
        "description":"Create a user."
    },
    "identity:update_user": {
        "target":"identity:update_user",
        "default":"(role:admin and system_scope:all) or (role:admin and token.domain.id:%(target.user.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "PATCH /v3/users/{user_id}"
        ],
        "description":"Update a user, including administrative password resets."
    },
    "identity:delete_user": {
        "target":"identity:delete_user",
        "default":"(role:admin and system_scope:all) or (role:admin and token.domain.id:%(target.user.domain_id)s)",
        "scopes":[
            "system",
            "domain"
        ],
        "operations":[
            "DELETE /v3/users/{user_id}"
        ],
        "description":"Delete a user."
    }
}