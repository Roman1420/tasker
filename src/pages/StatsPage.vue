<template>
    <div class="stats-page">
        <template v-if="allTaskLength">
            <div class="stats-page__item">Всего задач: {{ allTaskLength }}</div>
            <div class="stats-page__item">Осталось сделать: {{ taskLength }}</div>
            <div class="stats-page__item">Выполнено: {{ completedTaskLength }}</div>
        </template>
        <div
            v-else
            class="stats-page__item"
        >Нас ждут приключения! Переходи в раздел "Задачи", создавай новые - возможно здесь появится статистика ...</div>
    </div>
</template>

<script lang="ts">
import { Task } from '../interfaces/ITask'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'StatsPage',
    mounted() {
        if (localStorage.taskList) {
            this.allTaskLength = JSON.parse(localStorage.taskList).length;
            this.taskLength = JSON.parse(localStorage.taskList).filter((element: Task) => !element.completed).length;
            this.completedTaskLength = JSON.parse(localStorage.taskList).filter((element: Task) => element.completed).length;
        }
    },
    data(): {
        allTaskLength: number,
        taskLength: number,
        completedTaskLength: number
    } {
        return {
            allTaskLength: 0,
            taskLength: 0,
            completedTaskLength: 0
        }
    }
})
</script>

<style lang="scss">
.stats-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 8px;

    &__item {
        font-size: 32px;
        max-width: 500px;
    }
}
</style>
