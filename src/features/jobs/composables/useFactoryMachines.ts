import { reactive } from "vue";
import { MachineType, Machine } from "@/features/jobs";

export function useFactoryMachines() {
  const factoryMachines: Record<MachineType, Machine> = reactive({
    printer: {
      name: "Printer",
      taskSchedule: {},
    },
    laminator: {
      name: "Laminator",
      taskSchedule: {},
    },
    trimmer: {
      name: "Trimmer",
      taskSchedule: {},
    },
    cutter: {
      name: "Cutter",
      taskSchedule: {},
    },
    packaging: {
      name: "Packaging",
      taskSchedule: {},
    },
  });

  return {
    factoryMachines,
  };
}
