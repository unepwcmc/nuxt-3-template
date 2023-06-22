v-set
<template>
  <!-- No need a wrapper for all elements for components. (Only for componenets, pages,layout need wrapper) -->
  <h3>Elements for today</h3>
  <ul class="flex flex-col gap-4">
    <li>Dev Tools (Everywhere)</li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/nuxt"
        target="_blank"
      >
        Directory Structure (Documentation)
      </NuxtLink>
      (Example of this project directory)
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/api/composables/use-app-config"
        target="_blank"
      >
        composable apis (Documentation)
      </NuxtLink>
    </li>
    <li>
      Volar Plugin and Vue VScode Snippets (Vscode Example vbase-3-ts-setup)
    </li>
    <li>
      <NuxtLink :to="{ path: 'example' }">
        An example of composition API component structure (Example)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram"
        target="_blank"
      >
        Where is beforecreated and created? (Documentation)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://vuejs.org/api/composition-api-setup.html"
        target="_blank"
      >
        Most Used Compostion APIs (Documentation)
      </NuxtLink>
    </li>

    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/app"
        target="_blank"
      >
        App.vue (Documentation)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/concepts/auto-imports"
        target="_blank"
      >
        Auto-imports folders same as Nuxt2 but now including plugins,
        composables,utils and composition apis - (Documentation)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/concepts/modules"
        target="_blank"
      >
        buildModules is no longer used (Documentation)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/endpoint">
        $fetch is default option and can be used in both client and server side
        (Example)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/pages"
        target="_blank"
      >
        Pages slugs (Documentation)
      </NuxtLink>
      <NuxtLink to="/users/type-admin/2"> (Example) </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/layouts"
        target="_blank"
      >
        layouts & Page Title (Documentation)
      </NuxtLink>
      <NuxtLink to="/layout"> (Example) </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/composables#composables-directory"
        target="_blank"
      >
        Composables (Documentation)
      </NuxtLink>
      <NuxtLink to="/composables"> (Example) </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/plugins"
        target="_blank"
      >
        Plugins/helpers (Documentation)
      </NuxtLink>
      <NuxtLink to="/pluginpage"> (Example) </NuxtLink>
    </li>
    <li class="flex gap-4">
      <NuxtLink
        to="https://nuxt.com/docs/examples/routing/middleware#middleware "
        target="_blank"
      >
        Middleware (Documentation)
      </NuxtLink>
      <NuxtLink to="/users/type-admin/middleware">
        -abortNavigation(Example)</NuxtLink
      >
      <NuxtLink to="/users/type-author/middleware">
        -Allow to visit the page (Example)
      </NuxtLink>
      <NuxtLink to="/users/type-manager/middleware">
        -Go to Next Element Example(Example)
      </NuxtLink>
    </li>
    <li class="flex gap-4">
      <NuxtLink
        to="https://nuxt.com/docs/guide/directory-structure/components#client-components"
        target="_blank"
      >
        Client Only in components filenames (Documentation)
      </NuxtLink>

      <NuxtLink to="/clientrender"> -Client Side Rendering(Example) </NuxtLink>

      <NuxtLink to="/serversiderender">
        -Server Side Rendering(Example)
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/getting-started/state-management#using-third-party-libraries"
        target="_blank"
        >Pinia to replace vuex (Documentation)</NuxtLink
      >
      <NuxtLink to="/store"> (Example) </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://nuxt.com/docs/guide/concepts/server-engine"
        target="_blank"
      >
        Nuxt can be used as an endpoints provider (can be used lightly)
        (Documentation)
      </NuxtLink>
      <NuxtLink to="/endpoint">(Example)</NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="https://v8.i18n.nuxtjs.org/getting-started/basic-usage"
        target="_blank"
        >Use i18n (Documentation)
      </NuxtLink>
      <NuxtLink to="/language">(Example)</NuxtLink>
    </li>
  </ul>
</template>
