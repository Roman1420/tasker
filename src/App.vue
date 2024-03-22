<script lang="ts">
    export default {
        name: 'App',
    }
</script>

<template>
    <div class="navigation">
        <router-link class="button" to="/">Статистика</router-link>
        <router-link class="button" to="/tasks">Задачи</router-link>
    </div>
    <router-view />
</template>

<style scoped lang="scss">
.navigation {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    left: 50%;
    transform: translateX(-50%);
    top: 24px;
}

.router-link-active {
    color: white;
}
</style>
