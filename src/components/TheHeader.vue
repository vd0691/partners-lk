<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__content container">
               <div class="header__navigation">
                    <TheNavigation/>
               </div>
               <div class="header__user-controls">
                    <UserControls/>
               </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import TheNavigation from './TheNavigation.vue';
import UserControls from './UserControls.vue'

</script>

<style scoped lang="scss">
.header {
    display: flex;
    margin-top: 30px;
    position: sticky;
    top: 0;
    
    &__wrapper {
        @include flex-center;
        width: 100%;
        height: 50px;
        background: #eee;
    }
    &__content {
        display: flex;
        align-items: center;
    }
    &__navigation {
        width: 100%;
    }
}
</style>