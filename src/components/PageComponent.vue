<template >
  <header
    class="relative bg-amber-200 text-gray-100 after:pointer-events-none after:absolute 
    after:inset-x-0 after:inset-y-0 after:border-y
     after:border-white/10
     "

  >
    <div class="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="font-bold tracking-tight text-gray-800 
      sm:text-xl
      md:text-2xl
      lg:text-3xl">
        {{ title }}
        <slot name="header"></slot>
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
      <slot></slot>
    </div>
  </main>
</template>
<script setup>
const props = defineProps({
  title: String,
});
</script>
