<script setup>
import { ref, watch } from 'vue'
import axios from "axios";
import EditDataHandler from './EditDataHandler.vue'
import AddDataHandler from './AddDataHandler.vue'
import UploadFile from './UploadFile.vue'
const employeesData = ref(null)

async function fetchData() {
  const response = await axios.get("https://employee-atendance-node-production.up.railway.app/tasks/");
  employeesData.value = await response.data
}

async function removeAttendece(employee) {
  await axios.delete("https://employee-atendance-node-production.up.railway.app/tasks/" + employee._id);
}

fetchData()
watch(employeesData, fetchData)
</script>

<template>
  <div class="container">
    <h1 class="text-center">Employee Attendance</h1>
    <p v-if="!employeesData">Loading...</p>
    <div v-else class="attendence-container">
      <div v-for="(employee, i) in employeesData" :key="employee.id" class="attendence-data">
        <div class="attendence">
          <span class="d-inline-flex p-2  align-items-center gap-3">
            <p class="fs-5 fw-bold">User ID: </p>
            <p> {{ employee.userID }} </p>
          </span>
          <span class="d-inline-flex p-2  align-items-center gap-3">
            <p class="fs-5 fw-bold">User Name: </p>
            <p>{{ employee.userName }}</p>
          </span>
          <span class="d-inline-flex p-2  align-items-center gap-3">
            <p class="fs-5 fw-bold">Date: </p>
            <p> {{ employee.date }}</p>
          </span>
          <span class="d-inline-flex p-2  align-items-center gap-3">
            <p class="fs-5 fw-bold">Punch In: </p>
            <p> {{ employee.punchIn }}</p>
          </span>
          <span class="d-inline-flex p-2 align-items-center gap-3">
            <p class="fs-5 fw-bold">Punch Out: </p>
            <p>{{ employee.punchOut }}</p>
          </span>
        </div>
        <div class="d-flex flex-column justify-content-center gap-3">
          <EditDataHandler :employee="employeesData[i]" typeRequest="Edit Attendance" />
          <button type="button" class="btn btn-danger" @click="removeAttendece(employeesData[i])">Delete</button>
        </div>
      </div>
    </div>
    <div class="d-inline-flex p-2 justify-content-center align-items-center gap-3">
      <AddDataHandler typeRequest="Add Employee Attendance Manual" />
      <UploadFile />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 32px
}

.attendence-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attendence-data {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.attendence {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}
</style>
