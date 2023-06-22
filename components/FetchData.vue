<template>
  <div class="flex flex-col gap-6">
    <div>
      <p>
        <NuxtLink to="https://random-data-api.com/">
          API from https://random-data-api.com/
        </NuxtLink>
        using $fetch
      </p>
      <code v-text="users" />
    </div>

    <div>
      <p>
        <NuxtLink to="https://random-data-api.com/">
          API from https://random-data-api.com/
        </NuxtLink>
        using useFetch withc pick option
      </p>
      <code v-text="userLastname" />
    </div>

    <div>
      <p>Nuxt server can provide API endpoints</p>
      <code v-text="nuxtServerNitroReturn" />
    </div>
  </div>
</template>
<script setup lang="ts">
/* Use fetch is equivalent of useAsyncData + $fetch */
const { data: users } = useAsyncData("lastname", () => {
  const fetchReturn = $fetch("https://random-data-api.com/api/v2/users", {
    query: { size: 1 },
  });
  return fetchReturn;
});

/* Use fetch to call API */
const {
  data: userLastname,
  pending,
  error,
  refresh,
} = useFetch("https://random-data-api.com/api/v2/users", {
  onRequest({ request, options }) {
    // Set the request headers
    // options.headers["customHeader"] = "value";
  },
  onRequestError({ request, options, error }) {
    // Handle the request errors
  },
  onResponse({ request, response, options }) {
    // Process the response data
  },
  onResponseError({ request, response, options }) {
    // Handle the response errors
  },
  pick: ["last_name"],
});

/* Use Nuxt (Nitro) as an API Provider */
const { data: nuxtServerNitroReturn } = useFetch("/api/nuxtServer");
</script>
