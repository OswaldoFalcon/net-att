<script setup>
import { read, utils } from 'xlsx'
// import {ref} from 'vue';
import axios from "axios";
// const userID = ref("")
// const userName = ref("")
// const date = ref("")
// const punchIn = ref("")
// const punchOut = ref("")


async function addAttendece(id, name, date, inHour, outHour) {
  await axios.post("tasks/", {
    userID: id,
    userName: name,
    date: date,
    punchIn: inHour,
    punchOut: outHour
  })
}

async function uploadFile() {
  const file = document.getElementById("xlsxFile").files[0]
  const filedata = await file.arrayBuffer();
  const wb = read(filedata, { type: 'binary', cellText: true, cellDates: true });
  const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,dateNF:'yyyy-mm-dd'});
  data.shift()
  data.forEach((att) =>{
    addAttendece(att[0], att[1], att[2], att[3], att[4])
  })
}
</script>


<template>
  <div>
    <!-- Button trigger modal -->
    <input id="xlsxFile" class="file-input" type="file" ref="file" name="file" accept=".xlsx" @change="uploadFile()" />
  </div>
</template>