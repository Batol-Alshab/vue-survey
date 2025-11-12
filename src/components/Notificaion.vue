<template>
  <div
    v-if="notificaion.show"
    class="fixed w-[300] left-4 bottom-4 px-4 py-2 text-white animate-fade-in-down"
    :class="[notificaion.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
  >
    {{ notificaion.message }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const notificaion = computed(() => store.state.notificaion);
</script>
