import { describe, it, expect, beforeEach } from "vitest";
import { mount, flushPromises, VueWrapper } from "@vue/test-utils";
import TaskCell from "./TaskCell.vue";
import { useHighlightJob } from "../composables/useHighlightJob";
import { MachineType } from "@/features/jobs";

const mockTask = {
  id: "1",
  name: "Print",
  jobId: "JobA",
  machine: "printer" as MachineType,
};

describe("TaskCell.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(TaskCell, {
      props: {
        task: mockTask,
      },
    });
  });

  it('applies "task-cell-filled" class when task is present', () => {
    expect(wrapper.classes()).toContain("task-cell-filled");
  });

  it('applies "task-cell-highlighted" class on mouseover when highlightedJob matches task.jobId', async () => {
    const { highlightedJob } = useHighlightJob();
    highlightedJob.value = mockTask.jobId;

    await wrapper.find(".task-cell").trigger("mouseover");
    await flushPromises();

    expect(wrapper.classes()).toContain("task-cell-highlighted");
  });

  it('removes "task-cell-highlighted" class on mouseleave', async () => {
    const { highlightedJob } = useHighlightJob();
    highlightedJob.value = mockTask.jobId;

    await wrapper.find(".task-cell").trigger("mouseleave");
    await flushPromises();

    expect(wrapper.classes()).not.toContain("task-cell-highlighted");
  });

  it("renders task name and jobId correctly", () => {
    expect(wrapper.find(".job-name").text()).toBe(`[${mockTask.jobId}]`);
    expect(wrapper.find(".task-name").text()).toBe(mockTask.name);
  });
});
