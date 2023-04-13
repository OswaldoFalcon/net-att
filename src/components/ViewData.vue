<script setup>
import { ref, watch } from 'vue'
import axios from "axios";
import NotHandler from './NotHandler.vue'
import UploadFile from './UploadFile.vue'
const employeesData = ref(null)
const userID = ref("")
const userName = ref("")
const date = ref("")
const punchIn = ref("")
const punchOut = ref("")


async function fetchData() {
  const response = await axios.get("tasks/");
  employeesData.value = await response.data
}

async function addAttendece() {
  const response = await axios.post("tasks/", {
    userID: userID.value,
    userName: userName.value,
    date: date.value,
    punchIn: punchIn.value,
    punchOut: punchOut.value
  });
  employeesData.value.push(response.data)
  userID.value = ""
  userName.value = ""
  date.value = ""
  punchIn.value = ""
  punchOut.value = ""
}

async function removeAttendece(employee) {
  await axios.delete("tasks/" + employee._id);
}



fetchData()
watch(employeesData, fetchData)
</script>
<template>
  <div>
    <form @submit.prevent="addAttendece">
      <input class="input" v-model="userID" type="text" placeholder="Enter user ID" />
      <br />
      <input class="input" v-model="userName" type="text" placeholder="Enter user name" />
      <br />
      <p>Date</p>
      <input type="date" class="form-control" v-model="date" />
      <p>Punch In</p>
      <input type="time" class="form-control" v-model="punchIn" />
      <p>Punch Out</p>
      <input type="time" class="form-control" v-model="punchOut" />

      <button>Add Todo</button>
    </form>
    <hr>
    <p v-if="!employeesData">Loading...</p>
    <div v-else>
      <div v-for="(employee, i) in employeesData" :key="employee.id">
        <span>User ID: {{ employee.userID }}</span>
        <span>User Name: {{ employee.userName }}</span>
        <span>Date: {{ employee.date }}</span>
        <span>Punch In: {{ employee.punchIn }}</span>
        <span>Punch Out: {{ employee.punchout }}</span>
        <NotHandler :employee="employeesData[i]" />
        <button type="button" class="btn btn-danger" @click="removeAttendece(employeesData[i])">Delete</button>
      </div>
    </div>
    <UploadFile />
  </div>
</template>