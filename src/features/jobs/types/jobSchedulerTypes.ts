export type MachineType =
  | "printer"
  | "laminator"
  | "trimmer"
  | "cutter"
  | "packaging";

export interface Machine {
  name: string;
  taskSchedule: Record<number, Task>;
}

export interface Task {
  id: string;
  jobId: string;
  name: string;
  machine: MachineType;
}

export interface Job {
  jobId: string;
  tasks: Task[];
}
