<template>
  <h3 v-text="name" />
  <h4 v-text="`Likes ${likesCount}`" />
  <div class="flex gap-4">
    <button @click="addOne()">+</button>
    <button @click="deductOne()">-</button>
  </div>
  <hr />
  <h3 v-text="compostionName" />
  <h4 v-text="`Likes ${compostionLikes}`" />
  <div class="flex gap-4">
    <button @click="addOneforComposition()">+</button>
    <button @click="deductOneforComposition()">-</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/main";
import { useMainCompositionStore } from "@/store/mainComposition";

/* The pinia store was written in optional API */
const mainStore = useMainStore();
const { addOne, deductOne } = mainStore;
const { likesCount, name } = storeToRefs(mainStore);

/* The pinia store was written in composition API */
const MainCompositionStore = useMainCompositionStore();
const { addOneforComposition, deductOneforComposition } = MainCompositionStore;
const { compostionLikes, compostionName } = storeToRefs(MainCompositionStore);
</script>
