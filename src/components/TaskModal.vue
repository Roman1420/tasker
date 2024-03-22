<template>
    <div class="task-modal">
        <div class="task-modal__field">
            <div :class="[emptyFields.includes('name') ? 'empty' : '', 'task-modal__field-name']">Заголовок</div>
            <input
                class="task-modal__field-value"
                type="text"
                placeholder="Придумайте заголовок ..."
                v-model="localTask.name"
            />
        </div>
        <div class="task-modal__field">
            <div :class="[emptyFields.includes('desc') ? 'empty' : '', 'task-modal__field-name']">Описание</div>
            <textarea
                class="task-modal__field-value"
                type="text"
                placeholder="Опишите задачу ..."
                v-model="localTask.desc"
            ></textarea>
        </div>
        <div class="task-modal__add">
            <div
                v-if="task.id"
                class="button"
                @click="saveTask"
            >сохранить</div>
            <div
                v-else
                class="button"
                @click="createTask"
            >создать</div>
            <div
                v-if="task.id"
                class="button button--warning"
                @click="deleteTask"
            >удалить</div>
        </div>
        <div class="task-modal__add task-modal__add--top">
            <AnOutlinedRedo
                class="button icon"
                @click="refreshData"
            />
            <AnOutlinedPoweroff
                class="button icon"
                @click="closeModal"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Task } from '../interfaces/ITask'
import { AnOutlinedRedo } from "@kalimahapps/vue-icons"
import { AnOutlinedPoweroff } from "@kalimahapps/vue-icons"

export default defineComponent({
    name: 'TaskModal',
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true,
        }
    },
    components: {
        AnOutlinedRedo,
        AnOutlinedPoweroff
    },
    emits: {
        saveTask(task: Task) {
            return task;
        },
        createTask(task: Task) {
            return task;
        },
        closeModal() {
            return true;
        },
        deleteTask(task: Task) {
            return task;
        },
    },
    data(): {
        localTask: Task,
        emptyFields: string[]
    } {
        return {
            localTask: {...this.task},
            emptyFields: []
        }
    },
    methods: {
        saveTask() {
            if (this.validateTask()) {
                this.$emit('saveTask', this.localTask);
                this.closeModal();
            } else {
                this.markEmptyFields();
            }
        },
        createTask() {
            this.generateUniqueId();
            if (this.validateTask()) {
                this.$emit('createTask', this.localTask);
                this.closeModal();
            } else {
                this.markEmptyFields();
            }
        },
        refreshData() {
            this.localTask = {...this.task};
        },
        closeModal() {
            this.$emit('closeModal');
        },
        deleteTask() {
            this.$emit('deleteTask', this.task);
            this.closeModal();
        },
        validateTask() {
            this.emptyFields = [];
            return this.localTask.name
            && this.localTask.desc;
        },
        markEmptyFields() {
            if (!this.localTask.name) {
                this.emptyFields.push('name');
            }
            if (!this.localTask.desc) {
                this.emptyFields.push('desc');
            }
        },
        generateUniqueId() {
            let array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            this.localTask.id = array[0];
        }
    }
})
</script>

<style lang="scss">
.task-modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    padding: 32px 24px;
    gap: 10px;
    background-color: rgba(33, 53, 71, 0.99);
    width: 480px;
    max-width: 480px;

    &__field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;

        &-name {
            color: rgba(100, 214, 255, 0.8);

            &.empty {
                color: rgba(226, 75, 75, 0.9);
                animation: emptyField .2s;
                transition: .7s;
            }
        }

        &-value {
            width: 100%;
            outline: none;
            border: 0;
            background: none;
            font-family: inherit;
            color: white;
            background-color: rgba(255, 255, 255, .05);
            padding: 4px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7)
            }
        }
    }

    &__add {
        display: flex;
        align-content: center;
        gap: 10px;
        align-self: flex-end;

        &--top {
            position: absolute;
            right: 24px;
            top: 24px;
        }
    }

    &__button.button {

        &:hover {
            color: rgba(100, 214, 255, 0.91);
        }
    }
}

@keyframes emptyField {
    0% {
        transform: translateX(-5%);
    }

    50% {
        transform: translateX(5%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>
