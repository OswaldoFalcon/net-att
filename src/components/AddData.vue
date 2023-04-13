<script setup>
import { ref, defineEmits } from 'vue'
import axios from "axios";
const employeesData = ref(null)
const userID = ref("")
const userName = ref("")
const date = ref("")
const punchIn = ref("")
const punchOut = ref("")
defineEmits("close")

async function addAttendece() {
  const response = await axios.post("https://employee-atendance-node-production.up.railway.app/tasks/", {
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

</script>

<template>
  <div class="d-flex flex-column">
    <form @submit.prevent="addAttendece" class="d-flex flex-column">
      <div class="d-flex flex-column gap-2 mb-5">
        <p class="mb-0">Enter ID: </p>
        <input class="input" v-model="userID" type="text" placeholder="ID" />
        <p class="mb-0">Enter Name: </p>
        <input class="input" v-model="userName" type="text" placeholder="name" />
        <p class="mb-0">Date</p>
        <input type="date" class="form-control" v-model="date" />
        <p class="mb-0">Punch In</p>
        <input type="time" class="form-control" v-model="punchIn" />
        <p class="mb-0">Punch Out</p>
        <input type="time" class="form-control" v-model="punchOut" />
      </div>
      <button class="btn btn-primary mb-5 ">Add Todo</button>
    </form>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger" @click="$emit('close')">
      close
    </button>
  </div>
</template>
