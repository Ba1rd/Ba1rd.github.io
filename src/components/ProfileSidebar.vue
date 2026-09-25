<template>
  <aside class="profile-sidebar">
    <img
      class="avatar"
      :src="profile.avatar"
      :alt="`${profile.name} avatar`"
    />

    <h2 class="profile-name">{{ profile.name }}</h2>

    <p class="profile-title">{{ profile.title }}</p>
    <p class="profile-school">{{ profile.university }}</p>

    <div class="profile-meta">
      <span>{{ profile.location }}</span>
    </div>

    <div class="profile-links">
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
  </aside>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'
</script>