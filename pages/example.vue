<template>
  <div class="items-center text-center">
    <h2>When variable 'title' is reactive</h2>

    <input v-model="title" type="text" />
    <p>Title:<span v-text="title" /></p>
    <h2>
      A computed variable to detect title has value or not:
      {{ computedVariable }}
    </h2>
    <hr />

    <h2>When variable 'titleWithoutActive' is not reactive</h2>
    <h3 v-text="titleWithoutActive" />
    <input v-model="titleWithoutActive" type="text" />

    <hr />

    <button @click="showDateTime">Show Date Time</button>
    <h3 v-text="currentDateTime" />
    <hr />
    <h3>A component that has props</h3>
    <ComGreeting :title="'Hi! I have Border'" :show-border="true" />
    <ComGreeting
      v-bind="{
        title: 'Hi! I does not have Border',
        showBorder: false,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
const title = ref<string>("Hi!");
const titleWithoutActive: string = "Without ref wrapper";

const computedVariable = computed((): Boolean => {
  return !!title.value;
});

/* all reactive properties inside need to be accessed with .value 

    ** You do not need to have .value in template
 
*/
console.log("Access a state without .value:", title);
console.log("Access a state with .value:", title.value);

/* An example of using a function */
const currentDateTime = ref("");
function showDateTime(): void {
  currentDateTime.value = Date();
}

/* The example of using watch */
watch(title, (value, oldValue) => {
  console.log("Watch Title:", `New: ${value}`, `Old: ${oldValue}`);
});

/* Please notice the lifecycle order */
console.log("Setup");
onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
});
</script>

<style lang="postcss" scoped>
hr {
  @apply border-white 
  my-3;
}
</style>
