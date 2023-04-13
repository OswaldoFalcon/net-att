<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import EditData from './EditData.vue'
const isOpen = ref(false)
const prop = defineProps({
  employee: Object,
  typeRequest: String
})
defineEmits("close")
</script>


<template>
  <div class="root">
    <button class="btn btn-primary" @click="isOpen = true">{{ prop.typeRequest }}</button>

    <teleport to="body">
      <div class="modalFal" v-if="isOpen">
        <EditData :id="prop.employee._id" :employee="prop.employee" @close="isOpen = false" />
      </div>

    </teleport>
  </div>
</template>

<style>
.root {
  position: relative;
}

.modalFal {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e9e9e9;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalFal>div {
  background-color: #fff;
  padding: 50px;
  border-radius: 10px;
}
</style>