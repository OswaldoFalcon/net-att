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
  await axios.put("tasks/" + prop.id, {
    userID: userID.value,
    userName: userName.value,
    date: date.value,
    punchIn: punchIn.value,
    punchOut: punchOut.value
  })
}
</script>


<template>
  <div>
    <form @submit.prevent="updateAttendece">
      <input class="input" v-model="userID" type="text" :placeholder="prop.employee.userID" />
      <br />
      <input class="input" v-model="userName" type="text" :placeholder="prop.employee.userName" />
      <br />
      <p>Date</p>
      <input type="date" class="form-control" v-model="date" />
      <p>Punch In</p>
      <input type="time" class="form-control" v-model="punchIn" />
      <p>Punch Out</p>
      <input type="time" class="form-control" v-model="punchOut" />

      <button>Update</button>
    </form>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-danger" @click="$emit('close')">
      close
    </button>
  </div>
</template>