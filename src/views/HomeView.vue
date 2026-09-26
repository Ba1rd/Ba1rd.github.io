<template>
  <div class="container home-content">
    <SectionBlock id="about" title="About Me">
      <p v-for="paragraph in profile.bio" :key="paragraph">
        {{ paragraph }}
      </p>
    </SectionBlock>

    <SectionBlock id="education" title="Education">
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

    <SectionBlock id="research" title="Research Interests">
      <div class="interest-list">
        <span v-for="interest in profile.interests" :key="interest" class="interest-item">
          {{ interest }}
        </span>
      </div>
    </SectionBlock>
  </div>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'
import SectionBlock from '../components/SectionBlock.vue'
</script>
