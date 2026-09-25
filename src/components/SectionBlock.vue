<template>
  <section class="content-section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="section-rule"></div>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>