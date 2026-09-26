<template>
  <div class="container page">
    <div v-if="articles.length" class="article-list">
      <RouterLink
        v-for="article in articles"
        :key="article.slug"
        :to="`/articles/${article.slug}`"
        class="article-card"
      >
        <div class="article-card-main">
          <time>{{ formatDate(article.date) }}</time>
          <h2>{{ article.title }}</h2>
          <p>{{ article.summary }}</p>
        </div>

        <div class="article-card-meta">
          <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
        </div>
      </RouterLink>
    </div>

    <div v-else class="empty-state">
      暂时还没有文章。
    </div>
  </div>
</template>

<script setup lang="ts">
import { articles } from '../data/articles'

function formatDate(date: string) {
  return date.replaceAll('-', '.')
}
</script>
