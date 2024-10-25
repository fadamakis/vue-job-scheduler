<script setup lang="ts">
import { onMounted } from "vue";
import {
  useJobScheduler,
  useTimeSlots,
  factoryOpenTime,
  factoryCloseTime,
  TaskCell,
} from "@/features/jobs";

const { factoryMachines, fetchAndScheduleJobs } = useJobScheduler();
onMounted(fetchAndScheduleJobs);

const workingHours = factoryCloseTime - factoryOpenTime;

const { timeSlots } = useTimeSlots(factoryOpenTime, factoryCloseTime);
</script>

<template>
  <div class="table-wrapper">
    <table class="schedule-table">
      <thead>
        <tr>
          <th class="machine-name">&nbsp;</th>
          <th v-for="time in timeSlots" :key="time">
            {{ time }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="machine in factoryMachines" :key="machine.name">
          <td class="machine-name">{{ machine.name }}</td>
          <TaskCell
            v-for="hour in workingHours"
            :task="machine.taskSchedule[hour + factoryOpenTime - 1]"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow: auto;
}
.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

tr:nth-child(even) {
  background: #f7f7f7;
}

thead th {
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #000000;
}

.machine-name {
  width: 100px;
  text-align: left;
  padding: 10px;
  font-weight: bold;
  position: sticky;
  left: 0;
  background-color: #ffffff;
}
tr:nth-child(even) .machine-name {
  background: #f7f7f7;
}
</style>
