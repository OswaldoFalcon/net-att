<script setup>
import { read, utils } from 'xlsx'
import axios from "axios";

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
  const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
  data.shift()
  data.forEach((attendenceData) => {
    addAttendece(attendenceData[0], attendenceData[1], attendenceData[2], attendenceData[3], attendenceData[4])
  })
}
</script>


<template>
  <div>
    <input id="xlsxFile" class="file-input" type="file" ref="file" name="file" accept=".xlsx" @change="uploadFile()" />
  </div>
</template>