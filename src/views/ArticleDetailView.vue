<template>
  <article v-if="article" class="container article-page">
    <header class="article-header">
      <RouterLink to="/articles" class="back-link">← 我的文章</RouterLink>

      <h1>{{ article.title }}</h1>

      <div class="article-meta">
        <time>{{ formatDate(article.date) }}</time>
        <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
      </div>

      <p v-if="article.summary" class="article-summary">
        {{ article.summary }}
      </p>
    </header>

    <div class="article-content" v-html="renderedContent"></div>
  </article>

  <NotFoundView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { getArticleBySlug } from '../data/articles'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()

const article = computed(() => getArticleBySlug(String(route.params.slug)))

const renderedContent = computed(() =>
  article.value ? marked.parse(article.value.content) : '',
)

function formatDate(date: string) {
  return date.replaceAll('-', '.')
}
</script>
