<script lang="ts" setup>
import type { Task } from "../types/jobSchedulerTypes";
import { useHighlightJob } from "../composables/useHighlightJob";

const { highlightTask, highlightedJob } = useHighlightJob();

defineProps<{
  task?: Task;
}>();
</script>

<template>
  <td
    class="task-cell"
    :class="{
      'task-cell-filled': task,
      'task-cell-highlighted': task && highlightedJob === task?.jobId,
    }"
    @mouseover="() => highlightTask(task?.jobId)"
    @mouseleave="() => highlightTask(null)"
  >
    <template v-if="task">
      <div class="job-name text-ellipsis">[{{ task.jobId }}]</div>
      <div class="task-name text-ellipsis">{{ task.name }}</div>
    </template>
  </td>
</template>

<style scoped>
.task-cell {
  padding: 10px;
  width: 150px;
  max-width: 150px;
}

.task-cell-filled {
  background-color: #e0f7fa;
  border: 1px solid #00796b;
  cursor: pointer;
}

.task-cell-highlighted {
  background-color: #b2ebf2;
}

.job-name {
  color: #00796b;
  font-weight: bold;
  font-size: 14px;
}

.task-name {
  color: #333333;
  font-weight: bold;
  font-size: 13px;
}

.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
