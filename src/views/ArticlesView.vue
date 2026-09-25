<template>
  <div class="container page">
    <header class="page-header">
      <p class="eyebrow">Writing</p>
      <h1>我的文章</h1>
      <p>记录技术学习、研究思考以及其他值得留下的内容。</p>
    </header>

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
          <span v-if="article.category">{{ article.category }}</span>
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