<script setup>
import {useBoardStore} from "../stores/boardStore.ts";
import { useStorage} from "@vueuse/core";

const boardStore = useBoardStore()
const newColumnName = ref('')
const isModalOpen = computed(() => {
  return route.name === 'index-tasks-id'
})

const route = useRoute()
const router = useRouter()

function addColumn() {
  boardStore.addColumn(newColumnName.value)
  newColumnName.value = ''
}

function closeModal() {
router.push('/')
}
</script>
<template>
  <div class="board-wrapper">
  <main class="board">
    <BoardColumn
         v-for="(column, columnIndex) in boardStore.board.columns"
         :key="column.id"
         :column="column"
          :columnIndex="columnIndex">
    </BoardColumn>
    <UContainer class="column" >
      <UInput
          type="text"
          color="none"
              v-model="newColumnName"
              icon="i-heroicons-plus-circle-solid"
              placeholder="Create New Column"
      @keyup.enter="addColumn">
      </UInput>
    </UContainer>
  </main>
    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>