<script setup>
import { useBoardStore} from "~/stores/boardStore.ts";


const boardStore = useBoardStore()
const route = useRoute()
const router = useRouter()

const task = computed(() => {
  return boardStore.getTask(route.params.id);
})

function deleteTask() {
  boardStore.deleteTask(route.params.id)
  router.push('/')
}
</script>

<template>
  <div class="task-wrapper">
    <div v-if="task" class="task-view">
      <uFormGroup label="Name">
        <UInput type="text" v-model="task.name" class="w-full mb-4"/>
      </uFormGroup>
      <uFormGroup label="Description" class="w-full mb-4">
        <UTextarea v-model="task.description" />
      </uFormGroup>
      <UButton
          icon="i-heroicons-trash"
          color="red"
          @click="deleteTask">Delete Task</UButton>
    </div>
    <div v-else>
      <p>Task not found</p>
    </div>
  </div>
</template>