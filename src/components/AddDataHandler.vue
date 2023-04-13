<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import AddData from './AddData.vue'
const isOpen = ref(false)
const prop  = defineProps({
  typeRequest: String
})
defineEmits("close")
</script>


<template>
  <div class="root">
    <button class="btn btn-primary" @click="isOpen = true">{{prop.typeRequest}}</button>
    <teleport to="body">
      <div class="modalFal" v-if="isOpen">
        <AddData @close="isOpen = false" />
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
  background-color: Orgba(0, 0, 0, 0.1);
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