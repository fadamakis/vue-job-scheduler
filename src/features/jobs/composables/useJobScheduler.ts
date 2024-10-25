import {
  fetchJobs,
  factoryOpenTime,
  factoryCloseTime,
  useFactoryMachines,
} from "@/features/jobs";
import type { Task, Job } from "../types/jobSchedulerTypes";

export function useJobScheduler() {
  const { factoryMachines } = useFactoryMachines();
  function scheduleJob({ tasks, jobId }: Job) {
    let lastEndTime = factoryOpenTime;

    tasks.forEach((task) => {
      const machine = factoryMachines[task.machine];

      if (machine) {
        const nextAvailableHour = findNextAvailableHour(
          machine.taskSchedule,
          lastEndTime
        );
        if (nextAvailableHour < factoryCloseTime) {
          machine.taskSchedule[nextAvailableHour] = { ...task, jobId };
          lastEndTime = nextAvailableHour + 1;
        } else {
          console.log("Task can't be scheduled inside working hours");
        }
      } else {
        console.log(`Unknown Machine Type ${task.machine}`);
      }
    });
  }

  const findNextAvailableHour = (
    taskSchedule: Record<number, Task>,
    startHour = factoryOpenTime
  ): number => {
    let nextHour = startHour;
    while (taskSchedule[nextHour]) {
      nextHour += 1;
    }
    return nextHour;
  };

  const fetchAndScheduleJobs = async () => {
    const response: Job[] = await fetchJobs();
    response.forEach(scheduleJob);
  };

  return {
    factoryMachines,
    fetchAndScheduleJobs,
  };
}
