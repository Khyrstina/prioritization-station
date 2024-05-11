<script setup>
import {useBoardStore} from "../stores/boardStore.ts";

const boardStore = useBoardStore()
</script>
<template>
  <div class="board-wrapper">
  <main class="board">
    <div v-for="column in boardStore.board.columns"
         :key="column.name"
         class="column">
      <h2>{{ column.name }}</h2>
      <ul>
        <li v-for="task in column.tasks"
        :key="task.id">
          <h5>{{ task.name }}</h5>
          <p>{{ task.description }}</p>
        </li>
      </ul>
    </div>
  </main>
  </div>
</template>