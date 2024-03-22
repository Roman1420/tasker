<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Task } from '../interfaces/ITask'
import { AnFilledYuque } from "@kalimahapps/vue-icons"
import { AnFilledRocket } from "@kalimahapps/vue-icons"
export default defineComponent({
    name: 'TaskCard',
    components: {
        AnFilledYuque,
        AnFilledRocket,
    },
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true,
        }
    }
})
</script>

<template>
    <div :class="[task.completed ? 'completed' : '', 'task-card']">
        <div class="task-card__name">{{ task?.name }}</div>
        <div class="task-card__desc">{{ task?.desc }}</div>
        <AnFilledRocket
            v-if="task.completed"
            class="task-card__icon icon"
        />
        <AnFilledYuque
            v-else
            class="task-card__icon icon"
        />
    </div>
</template>

<style lang="scss">
.task-card {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 4px;
    background-color: rgba(33, 53, 71, .7);
    padding: 16px;
    transition: .3s;

    &.completed {
        background-color: rgba(33, 71, 59, .7);

        &:hover,&:active {
            background-color: rgba(33, 71, 59, .9);
        }
    }

    &:hover,&:active {
        background-color: rgba(33, 53, 71, .9);
    }

    &__name, &__desc {
        overflow: hidden;
        text-overflow: ellipsis; 
    }

    &__name {
        font-weight: bold;
        white-space: nowrap;
        color: #0BA5BE;
        font-size: 20px;
        max-width: 95%;
    }

    &__desc {
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        color: white;
        font-size: 16px;
    }

    &__icon {
        position: absolute;
        right: 8px;
        top: 8px;
    }
}
</style>
