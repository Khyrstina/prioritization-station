<script setup>
import {useBoardStore} from "../stores/boardStore.ts";
import { useStorage} from "@vueuse/core";

const boardStore = useBoardStore()
const newColumnName = ref('')
const editNameState = ref(false)

function addColumn() {
  boardStore.addColumn(newColumnName.value)
  newColumnName.value = ''
}
function deleteColumn(columnIndex) {
  boardStore.deleteColumn(columnIndex)
}
</script>
<template>
  <div class="board-wrapper">
  <main class="board">
    <UContainer
         v-for="(column, columnIndex) in boardStore.board.columns"
         :key="column.name"
         class="column">
      <div class="column-header mb-4">
        <div>
        <UInput v-if="editNameState" type="text" v-model="column.name">
        </UInput>
          <h2 v-else class="mb-4">{{ column.name }}</h2>
        </div>
        <div>
          <UButton
          icon="i-heroicons-pencil-square"
          color="purple"
          class="mr-2"
          @click="editNameState = !editNameState"/>
          <UButton
              icon="i-heroicons-trash"
              color="red"
              @click="deleteColumn(columnIndex)"/>
        </div>
      </div>
      <ul>
        <li v-for="task in column.tasks"
        :key="task.id">
          <UCard class="mb-4">
          <h5>{{ task.name }}</h5>
          <p>{{ task.description }}</p>
          </UCard>
        </li>
      </ul>
    </UContainer>
    <UContainer class="column">
      <UInput type="text"
              v-model="newColumnName"
              icon="i-heroicons-plus-circle-solid"
              placeholder="Create New Column"
      @keyup.enter="addColumn">

      </UInput>
    </UContainer>
  </main>
  </div>
</template>