const { POLICY_NAMES_LIST: _POLICY_NAMES_LIST } = useWcmcUserManagementPolicy()
/**
 * Read here to find out why we need to do this extra step if you want to use POLICY_NAMES_LIST in marco (in definePageMeta)
 * https://nuxt.com/docs/guide/directory-structure/pages/#page-metadata
 */
enum EXTRA_POLICY_LIST {
	// icca
	ICCA_DATA_LIST = "iccas_data_list",

}

/**
 * If you are using me in setup treat me like a composable function so you don't need to import me.
 * If you want to use me in definePageMeta (marco) make sure you import me like following in your component/page
 * import { POLICY_NAMES_LIST } from "~/utils/policy"
 */
export const POLICY_NAMES_LIST = { ...EXTRA_POLICY_LIST, ..._POLICY_NAMES_LIST }
