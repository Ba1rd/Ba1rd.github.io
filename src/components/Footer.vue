<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-meta">
        <span>Framework v{{ frameworkVersion }}</span>
        <RouterLink
          v-if="latestArticle"
          :to="`/articles/${latestArticle.slug}`"
          class="latest-article"
        >
          {{ latestArticle.title }}
        </RouterLink>
      </div>

      <div class="copyright">© 2026 {{ profile.name }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'
import { articles } from '../data/articles'

const frameworkVersion = '1.1'
const latestArticle = articles[0]
</script>
