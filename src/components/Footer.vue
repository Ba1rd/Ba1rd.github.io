<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-links">
        <a
          v-for="link in profile.links"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="copyright">© {{ year }} {{ profile.name }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>