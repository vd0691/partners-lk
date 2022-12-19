<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__content container">
                <TheNavigation/>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import TheNavigation from './TheNavigation.vue';


</script>

<style scoped lang="scss">
.header {
    
    &__wrapper {
        @include flex-center;
        width: 100%;
        height: 100px;
        background: #eee;
    }
}
</style>