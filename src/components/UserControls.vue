<template>
    <div class="user-panel">
        <button class="user-panel__logout" @click="logout">
            Выйти
        </button>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore()
const logout = () => {
    store.dispatch('logout')
}
</script>