<script setup>
import {useBoardStore} from "../stores/boardStore.ts";
const boardStore = useBoardStore()
const router = useRouter()

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
})
const editNameState = ref(false)
const newTaskName = ref('')

function addTask() {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex,
  })
  newTaskName.value = ''
}

function deleteColumn(columnIndex) {
  boardStore.deleteColumn(columnIndex)
}

function goToTask(taskId) {
  router.push(`/tasks/${taskId}`)
}

function pickupColumn(event, fromColumnIndex) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('type', 'column')
  event.dataTransfer.setData('from-column-index', fromColumnIndex)
}

function pickUpTask(event, { fromColumnIndex, fromTaskIndex }) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('type', 'task')
  event.dataTransfer.setData('from-column-index', fromColumnIndex)
  event.dataTransfer.setData('from-task-index', fromTaskIndex)
}

function dropItem(event, { toColumnIndex, toTaskIndex }) {
  const type = event.dataTransfer.getData('type')
  const fromColumnIndex = event.dataTransfer.getData('from-column-index')

  if( type === 'task') {
    const fromTaskIndex = event.dataTransfer.getData('from-task-index')

    boardStore.moveTask({
      fromTaskIndex,
      toTaskIndex,
      fromColumnIndex,
      toColumnIndex,
    })
  } else if (type === 'column') {
    boardStore.moveColumn({
      fromColumnIndex,
      toColumnIndex,
    })
  }

}
</script>

<template>
  <UContainer class="column"
              draggable="true"
              @dragstart.self="pickupColumn($event, columnIndex)"
              @dragenter.prevent
              @dragover.prevent
              @drop.stop="dropItem($event, {toColumnIndex: columnIndex })">
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
      <li v-for="(task, taskIndex) in column.tasks"
          :key="task.id">
        <UCard class="mb-4 task-item" @click="goToTask(task.id)" draggable="true"
        @dragstart="pickUpTask($event, {
          fromTaskIndex: taskIndex,
          fromColumnIndex: columnIndex,
        })"
        @drop.stop="dropItem($event, {
          toColumnIndex: columnIndex,
          toTaskIndex: taskIndex })">
          <h5>{{ task.name }}</h5>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput
        v-model="newTaskName"
        type="text"
        color="purple"
        icon="i-heroicons-plus-circle-solid"
        placeholder="Create New Task"
    @keyup.enter="addTask"/>
  </UContainer>
</template>