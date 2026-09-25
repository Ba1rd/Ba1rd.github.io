<template>
  <div class="container home-layout">
    <ProfileSidebar />

    <div class="home-content">
      <section class="hero">
        <p class="eyebrow">Personal Website</p>
        <h1>{{ profile.name }}</h1>
      </section>

      <SectionBlock title="About Me">
        <p v-for="paragraph in profile.bio" :key="paragraph">
          {{ paragraph }}
        </p>
      </SectionBlock>

      <SectionBlock title="Education">
        <div
          v-for="item in profile.education"
          :key="`${item.school}-${item.period}`"
          class="timeline-row"
        >
          <div>
            <strong>{{ item.school }}</strong>
            <span>{{ item.department }}</span>
          </div>
          <time>{{ item.period }}</time>
        </div>
      </SectionBlock>

      <SectionBlock title="Research Interests">
        <div class="tag-list">
          <span v-for="interest in profile.interests" :key="interest" class="tag">
            {{ interest }}
          </span>
        </div>
      </SectionBlock>

      <SectionBlock title="Selected Projects">
        <div class="project-list">
          <article v-for="project in profile.projects" :key="project.title" class="project-item">
            <div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <span>{{ project.type }}</span>
          </article>
        </div>
      </SectionBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import SectionBlock from '../components/SectionBlock.vue'
</script>