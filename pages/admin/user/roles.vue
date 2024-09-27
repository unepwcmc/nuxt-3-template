<template>
	<LayoutFetchError
		class="page-admin-user-roles"
		:errorList
		:errorRedirect="{
			path: localePath({ name: 'admin' }),
			title: t('button.goBackTo', { name: t('navigation.admin.index') })
		}"
	>
		<UserManagementViewUserRoles
			class="page-admin-user-roles__table"
			:useDefaultStyle="1"
			:enableComponents="{
				viewUserRoles: true
			}"
			@errorOccured="errorOccured"
		>
			<template
				v-if="currentUserHasThePolicy(_POLICY_NAMES_LIST.LIST_POLICIES_DATA)"
				#extraActions="{ row }"
			>
				<NuxtLink
					:to="
						localePath({
							name: 'admin-user-role-userRoleId',
							params: {
								userRoleId: row.model_data.id
							}
						})
					"
					class="page-admin-user-roles__button"
				>
					<IconArrow class="page-admin-user-roles__icon" />
				</NuxtLink>
			</template>
		</UserManagementViewUserRoles>
	</LayoutFetchError>
</template>

<script setup lang="ts">
import { usePolicyStore } from "@/store/usePolicyStore"

const _POLICY_NAMES_LIST = POLICY_NAMES_LIST
const localePath = useLocalePath()
const errorList = ref<string[]>([])
const { t } = useI18n()
useHead({
	title: t("navigation.user.roles")
})
function errorOccured(errors: string[]) {
	errorList.value = errors
}
const { currentUserHasThePolicy } = usePolicyStore()
definePageMeta({
	checkPolicies: {
		checkThesePoliciesIfCurrentUserCanDo: [
			POLICY_NAMES_LIST.ROLES_DATA_LIST,
			POLICY_NAMES_LIST.LIST_POLICIES_DATA
		],
		redirect: {
			whenFailedInThesePolicies: [POLICY_NAMES_LIST.ROLES_DATA_LIST],
			to: { name: "index" },
		},
	},
})
</script>

<style lang="postcss" scoped>
.page-admin-user-roles {
  @apply flex justify-center;

  &__table {
    @apply min-w-full lg:min-w-[50rem];
  }

  &__icon {
    @apply h-8 text-theme-primary;
  }
}

:deep(.wcmc-ct-interactive-table--use-default-style-1) {
  .wcmc-ct-interactive-table-feature-list-display-record__item {
    @apply flex flex-row gap-3;
  }
}
</style>
