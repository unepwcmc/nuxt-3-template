const adminMenuItems = ref<MenuItem[]>([
  {
    path: { name: 'admin-user-management' },
    title: 'User Management'
  }
])
const accountMenuItems = ref<MenuItem[]>([
  {
    path: { name: 'account-update-password' },
    title: 'Update password'
  }
])

export function useNavigation () {
  const { status } = useAuth()
  const { t } = useI18n()
  const toSignInOutLink = computed(() => ({ name: status.value === 'authenticated' ? 'sign-out' : 'sign-in' }))
  const toSignInOutText = computed(() => status.value === 'authenticated' ? t('buttons.signOut') : t('buttons.signIn'))
  const mainMenuItems = ref<MenuItem[]>([
    {
      path: { name: 'interactive-table' },
      title: 'Interactive Table'
    },
    {
      path: { name: 'account' },
      title: 'Account',
      sub: accountMenuItems.value
    },
    {
      path: { name: 'admin' },
      title: 'Admin',
      sub: adminMenuItems.value
    },
    {
      path: toSignInOutLink,
      title: toSignInOutText
    }
  ])
  return {
    adminMenuItems,
    accountMenuItems,
    mainMenuItems
  }
}
