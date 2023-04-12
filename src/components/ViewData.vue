<script setup>
import { ref, watch } from 'vue'
import axios from "axios";
const employeesData = ref(null)
const userID = ref("")
const userName = ref("")

async function fetchData() {
  const response = await axios.get("tasks/");
  employeesData.value = await response.data
}

async function addTodo() {
  const response = await axios.post("tasks/", {
    userID: userID.value,
    userName: userName.value
  });
  employeesData.value.push(response.data)
  userID.value = ""
  userName.value = ""
}


fetchData()
watch(employeesData, fetchData)
</script>
<template>
  <form  @submit.prevent="addTodo">
    <input class="input" v-model="userID" type="text"  placeholder="Enter user ID" />
    <br />
    <input class="input" v-model="userName" type="text" placeholder="Enter user name" />
    <br />
    <button>Add Todo</button>
  </form>
  <hr>
  <p v-if="!employeesData">Loading...</p>
  <div v-else>
    <div v-for="employee in employeesData" :key="employee.id">
      <span>{{ employee.userID }}</span> <br>
      <span>{{ employee.userName }}</span>
    </div>
  </div>
</template>