<template>
    <div class="page">
        <div class="page__wrapper">
            <TheHeader>
                <div class="header__content">
                    <TheNavigation class="header__navigation"/>
                    <UserPanel class="header__user-panel"/>
                </div>
            </TheHeader>
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';
import UserPanel from '@/components/UserPanel.vue';

</script>

<style lang="scss">

.header {

    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__navigation {
        width: 100%;
    }

    .user-panel__button {
        background: #fff;
        color: #000;
        padding: 4px 8px;
    }

}
</style>