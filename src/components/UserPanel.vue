<template>
    <div class="user-panel">
        <BaseButton text="Выйти" @click="logout" class="user-panel__button"/>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import BaseButton from './BaseButton.vue';

const store = useStore()
const logout = () => {
    store.dispatch('LOGOUT')
}
</script>