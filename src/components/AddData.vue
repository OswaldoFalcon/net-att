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
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger" @click="$emit('close')">
      close
    </button>
  </div>
</template>