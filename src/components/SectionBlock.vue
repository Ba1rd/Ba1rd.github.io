<template>
  <section :id="id" class="content-section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="section-rule"></div>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  title: string
}>()
</script>
