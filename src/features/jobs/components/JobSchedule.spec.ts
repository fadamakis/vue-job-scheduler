import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import JobSchedule from "./JobSchedule.vue";
import { useJobScheduler, useTimeSlots, TaskCell } from "@/features/jobs";

vi.mock(import("@/features/jobs"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useJobScheduler: vi.fn(),
    useTimeSlots: vi.fn(),
  };
});

describe("JobSchedule.vue", () => {
  beforeEach(() => {
    const mockTimeSlots = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ];
    const mockFactoryMachines = [
      {
        name: "Printer",
        taskSchedule: { 8: { name: "Print" }, 9: { name: "Laminate" } },
      },
      {
        name: "Cutter",
        taskSchedule: { 8: { name: "Cut" }, 10: { name: "Trim" } },
      },
    ];

    (useTimeSlots as Mock).mockReturnValue({ timeSlots: mockTimeSlots });
    (useJobScheduler as Mock).mockReturnValue({
      factoryMachines: mockFactoryMachines,
      fetchAndScheduleJobs: vi.fn(),
    });
  });

  it("calls fetchAndScheduleJobs on mount", () => {
    const { fetchAndScheduleJobs } = useJobScheduler();
    mount(JobSchedule);
    expect(fetchAndScheduleJobs).toHaveBeenCalled();
  });

  it("renders time slots in the table header", async () => {
    const wrapper = mount(JobSchedule);
    await flushPromises();

    const headerCells = wrapper.findAll("thead th");
    expect(headerCells).toHaveLength(9);
    expect(headerCells[1].text()).toBe("08:00");
    expect(headerCells[headerCells.length - 1].text()).toBe("15:00");
  });

  it("renders factory machines and TaskCell components correctly", async () => {
    const wrapper = mount(JobSchedule);
    await flushPromises();

    const machineRows = wrapper.findAll("tbody tr");
    expect(machineRows).toHaveLength(2);

    expect(machineRows[0].find(".machine-name").text()).toBe("Printer");

    const taskCells = machineRows[0].findAll(".task-cell");
    expect(taskCells).toHaveLength(8);
  });

  it("passes the correct task prop to TaskCell", async () => {
    const wrapper = mount(JobSchedule);
    await flushPromises();

    const firstMachineRow = wrapper.findAll("tbody tr")[0];
    const taskCells = firstMachineRow.findAllComponents(TaskCell);

    expect(taskCells[0].props("task")).toEqual({ name: "Print" });
  });
});
