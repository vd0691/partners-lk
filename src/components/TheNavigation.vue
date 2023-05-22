<template>
    <nav class="navigation">
        <ul class="navigation__list">
            <li class="navigation__item" v-for="link in navigationLinks" :key="link.name">
                <RouterLink class="navigation__link navigation-main-link" :to="link.path">
                    {{ link.name }}
                    <slot :data="link"/>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">

const navigationLinks = [{ name: 'Каталог', path: '/' }, { name: 'Заказы / Корзина', path: '/orders', tag: 'cart' }, { name: 'Документы', path: '/documents' }]

</script>

<style scoped lang="scss">
.navigation {

    &__list {
        display: flex;
        justify-content: center;
    }

    & .router-link-active {
        color: #ccc;
    }

}
</style>