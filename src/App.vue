<template>
  <AppHeader />
  <main>
    <JobSchedule />
  </main>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { JobSchedule } from "@/features/jobs";
</script>
