import { ref } from "vue";

const highlightedJob = ref<string | null>(null);

export function useHighlightJob() {
  const highlightTask = (jobId?: string | null) => {
    highlightedJob.value = jobId ?? null;
  };

  return {
    highlightTask,
    highlightedJob,
  };
}
