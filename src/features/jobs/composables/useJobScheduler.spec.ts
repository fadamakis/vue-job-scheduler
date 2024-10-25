import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { useJobScheduler } from "./useJobScheduler";
import { fetchJobs, MachineType } from "@/features/jobs";
import type { Job } from "../types/jobSchedulerTypes";

beforeEach(() => {
  vi.restoreAllMocks();

  vi.mock("@/features/jobs", () => ({
    fetchJobs: vi.fn(),
    factoryOpenTime: 8,
    factoryCloseTime: 16,
    useFactoryMachines: vi.fn(() => ({
      factoryMachines: {
        printer: { name: "Printer", taskSchedule: {} },
        laminator: { name: "Laminator", taskSchedule: {} },
        cutter: { name: "Cutter", taskSchedule: {} },
      },
    })),
  }));
});

describe("useJobScheduler", () => {
  it("schedules tasks on the correct machines", async () => {
    const mockJobs: Job[] = [
      {
        jobId: "JobA",
        tasks: [
          { id: "1", name: "Print", machine: "printer", jobId: "JobA" },
          { id: "2", name: "Laminate", machine: "laminator", jobId: "JobA" },
        ],
      },
    ];

    (fetchJobs as Mock).mockResolvedValue(mockJobs);

    const { fetchAndScheduleJobs, factoryMachines } = useJobScheduler();

    await fetchAndScheduleJobs();

    expect(factoryMachines.printer.taskSchedule[8]).toEqual({
      id: "1",
      name: "Print",
      machine: "printer",
      jobId: "JobA",
    });

    expect(factoryMachines.laminator.taskSchedule[9]).toEqual({
      id: "2",
      name: "Laminate",
      machine: "laminator",
      jobId: "JobA",
    });
  });

  it("logs unknown machine types", async () => {
    const mockJobs: Job[] = [
      {
        jobId: "JobB",
        tasks: [
          {
            id: "1",
            name: "Unknown Task",
            machine: "unknownMachine" as MachineType,
            jobId: "JobB",
          },
        ],
      },
    ];

    const consoleSpy = vi.spyOn(console, "log");

    (fetchJobs as Mock).mockResolvedValue(mockJobs);

    const { fetchAndScheduleJobs } = useJobScheduler();

    await fetchAndScheduleJobs();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Unknown Machine Type unknownMachine"
    );
  });

  it("schedules multiple jobs consecutively without overlap", async () => {
    const mockJobs: Job[] = [
      {
        jobId: "JobC",
        tasks: [{ id: "1", name: "Print", machine: "printer", jobId: "JobC" }],
      },
      {
        jobId: "JobD",
        tasks: [
          { id: "2", name: "Print Next", machine: "printer", jobId: "JobD" },
        ],
      },
    ];

    (fetchJobs as Mock).mockResolvedValue(mockJobs);

    const { fetchAndScheduleJobs, factoryMachines } = useJobScheduler();

    await fetchAndScheduleJobs();

    expect(factoryMachines.printer.taskSchedule[8]).toEqual({
      id: "1",
      name: "Print",
      machine: "printer",
      jobId: "JobC",
    });

    expect(factoryMachines.printer.taskSchedule[9]).toEqual({
      id: "2",
      name: "Print Next",
      machine: "printer",
      jobId: "JobD",
    });
  });

  it("schedules tasks up to factory closing time", async () => {
    const mockJobs: Job[] = [
      {
        jobId: "JobE",
        tasks: Array(10)
          .fill(null)
          .map((_, i) => ({
            id: `${i}`,
            name: `Print ${i}`,
            machine: "printer",
            jobId: "JobE",
          })),
      },
    ];

    (fetchJobs as Mock).mockResolvedValue(mockJobs);

    const { fetchAndScheduleJobs, factoryMachines } = useJobScheduler();

    await fetchAndScheduleJobs();

    expect(factoryMachines.printer.taskSchedule[15]).toBeDefined();
    expect(factoryMachines.printer.taskSchedule[16]).toBeUndefined();
  });
});
