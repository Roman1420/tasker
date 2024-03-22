<template>
    <div class="main-page">
        <div class="main-page__col">
            <div class="main-page__title">Текущие задачи</div>
            <div
                v-if="!taskList.length"
                class="main-page__prompt"
            >Нет текущих задач, Добби свободен!</div>
            <draggable
                class="main-page__list"
                :list="taskList"
                group="tasks"
                itemKey="id"
                @change="handleTaskList"
            >
                <template #item="{element}">
                    <task-card
                        class="main-page__list-item"
                        :task="element"
                        @click="openTask(element)"
                    />
                </template>
            </draggable>
        </div>
        <div class="main-page__col">
            <div class="main-page__title">Выполненные задачи</div>
            <div
                v-if="!completedTaskList.length"
                class="main-page__prompt main-page__prompt--dotted"
            >Пока что нет выполненных задач ...</div>
            <draggable
                class="main-page__list"
                :list="completedTaskList"
                group="tasks"
                itemKey="id"
                @change="handleCompletedTaskList"
            >
                <template #item="{element}">
                    <task-card
                        class="main-page__list-item"
                        :task="element"
                        @click="openTask(element)"
                    />
                </template>
            </draggable>
        </div>
        <div class="main-page__add">
            <div
                class="main-page__button"
                @click="addTask"
            >+ Создать задачу</div>
        </div>
        <transition name="fade">
            <task-modal
                v-if="currentTask"
                :task="currentTask"
                @closeModal="currentTask = null"
                @saveTask="saveTask"
                @createTask="createTask"
                @deleteTask="deleteTask"
            />
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Task } from '../interfaces/ITask'
import draggable from 'vuedraggable'
import TaskCard from '../components/TaskCard.vue'
import TaskModal from '../components/TaskModal.vue'

const emptyTask: Task = {
    id: null,
    name: '',
    desc: '',
    completed: false
};

export default defineComponent({
    name: 'TasksPage',
    components: {
        TaskCard,
        TaskModal,
        draggable
    },
    mounted() {
        if (localStorage.taskList) {
            this.taskList = JSON.parse(localStorage.taskList).filter((element: Task) => !element.completed);
            this.completedTaskList = JSON.parse(localStorage.taskList).filter((element: Task) => element.completed);
        }
    },
    data(): {
        drag: boolean,
        taskList: Task[],
        completedTaskList: Task[],
        currentTask: Task | null
    } {
        return {
            drag: true,
            taskList: [],
            completedTaskList: [],
            currentTask: null
        }
    },
    methods: {
        updateLocalStorage() {
            localStorage.taskList = JSON.stringify(
                [...this.taskList, ...this.completedTaskList]
            );
        },
        addTask() {
            this.currentTask = emptyTask;
        },
        openTask(task: Task) {
            this.currentTask = task;
        },
        saveTask(task: Task) {
            console.log('this.taskList.filter(element => element.id !== task.id): ', this.taskList.filter(element => element.id !== task.id));
            if (task.completed) {
                this.completedTaskList = this.completedTaskList.filter((element: Task) => element.id !== task.id);
                this.completedTaskList.push(task);
            } else {
                this.taskList = this.taskList.filter((element: Task) => element.id !== task.id);
                this.taskList.push(task);
            }
            this.updateLocalStorage();
        },
        createTask(task: Task) {
            this.taskList.push(task);
            this.updateLocalStorage();
        },
        deleteTask(task: Task) {
            if (task.completed) {
                this.completedTaskList = this.completedTaskList.filter((element: Task) => element.id !== task.id);
            } else {
                this.taskList = this.taskList.filter((element: Task) => element.id !== task.id);
            }
            this.updateLocalStorage();
        },
        handleTaskList(event: any) {
            if (event.added) {
                event.added.element.completed = false;
                this.updateLocalStorage();
            }
        },
        handleCompletedTaskList(event: any) {
            if (event.added) {
                event.added.element.completed = true;
                this.updateLocalStorage();
            }
        }
    }
})
</script>

<style lang="scss">
$padding: 50px;
$paddingTop: 100px;
$lineHeight: 32px;
$gap: 16px;

.main-page {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: $paddingTop $padding 0 $padding;
    min-height: 100vh;
    width: 100%;
    gap: 24px;

    &__col {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: $gap;
        width: calc((100% - $gap)/2);
    }

    &__button {
        padding: 2em;
        font-weight: bold;
        color: rgb(100 214 255 / 91%);
        display: flex;
        transition: .3s;
        cursor: pointer;

        &:hover {
            color: white;
            filter: drop-shadow(0 0 1em white);
        }
    }

    &__title {
        font-size: 24px;
        line-height: $lineHeight;
        text-align: left;
    }

    &__add {
        position: absolute;
        right: 0.5*$padding;
        top: 0.5*$padding;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: calc(100vh - $paddingTop - $lineHeight - $gap);

        &-item {
            cursor: pointer;

            &:active { 
                cursor: grab;
            }
        }
    }

    &__prompt {
        position: absolute;
        padding: 32px 0;
        width: 100%;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
        font-weight: bold;
        pointer-events: none;
        border: 1px dashed gray;
        color: gray;

        &--dotted {
            border: 1px dotted gray;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition:.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale(.1);
}
</style>
