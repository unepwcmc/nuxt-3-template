import type { RouteLocationRaw } from 'vue-router'

export enum POLICY_NAMES_LIST {
	// user
	USER_SHOW = 'user_show',
	UNARCHIVE_USER = 'unarchive_user',
	CHECK_POLICIES_FOR_USER = 'check_policies_for_user', // /policies/check_user_policies
	USER_POLICIES_LIST = 'user_policies_list', // /users/3/user_policies_list
	ARCHIVE_USER = 'archive_user',
	UPDATE_USER_WITH_ROLE = 'update_user_with_role',
	USERS_DATA_LIST = 'users_data_list',
	UPDATE_USER_EMAIL = 'update_user_email',
	CREATE_USER_WITH_ROLE = 'create_user_with_role',
	// roles
	REMOVE_ROLE_FROM_USERS = 'remove_role_from_users',
	ROLES_DATA_LIST = 'roles_data_list',
	ADD_ROLE_TO_USERS = 'add_role_to_users',
	ROLES_BASIC_LIST = 'roles_basic_list',
	// policies
	ASSIGN_POLICIES_TO_USER = 'assign_policies_to_user',
	LIST_POLICIES_DATA = 'list_policies_data',
	ASSIGN_POLICIES_TO_ROLE = 'assign_policies_to_role',

}

declare global {
	type PolicyCheckFailedRedirect = {
		whenFailedInThesePolicies?: POLICY_NAMES_LIST[]
		to?: RouteLocationRaw
	}
	type CheckPolicies = {
		checkThesePoliciesIfCurrentUserCanDo?: POLICY_NAMES_LIST[]
		redirect?: PolicyCheckFailedRedirect
	}
}
import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		checkPolicies?: CheckPolicies
	}
}
