<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import axios from "axios";
const userID = ref("")
const userName = ref("")
const date = ref("")
const punchIn = ref("")
const punchOut = ref("")
const prop = defineProps({
  id: String,
  employee: null,
})
defineEmits("close")

async function updateAttendece() {
  await axios.put("https://employee-atendance-node-production.up.railway.app/tasks/" + prop.id, {
    userID: userID.value,
    userName: userName.value,
    date: date.value,
    punchIn: punchIn.value,
    punchOut: punchOut.value
  })
}
</script>


<template>
  <div class="d-flex flex-column">
    <form @submit.prevent="updateAttendece" class="d-flex flex-column">
      <div class="d-flex flex-column gap-2 mb-5">
        <p class="mb-0">Enter ID: </p>
        <input class="input" v-model="userID" type="text" :placeholder="prop.employee.userID" />
        <p class="mb-0">Enter Name: </p>
        <input class="input" v-model="userName" type="text" :placeholder="prop.employee.userName" />
        <p class="mb-0">Date</p>
        <input type="date" class="form-control" v-model="date" />
        <p class="mb-0">Punch In</p>
        <input type="time" class="form-control" v-model="punchIn" />
        <p class="mb-0">Punch Out</p>
        <input type="time" class="form-control" v-model="punchOut" />
      </div>
      <button class="btn btn-primary mb-5">Update</button>
    </form>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger" @click="$emit('close')">
      close
    </button>
  </div>
</template>
