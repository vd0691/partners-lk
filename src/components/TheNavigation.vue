<template>
    <nav class="nav">
        <ul class="nav__list">
            <li class="nav__item">
                <router-link class="nav__link" to="/">Главная</router-link>
            </li>
            <li class="nav__item">
                <router-link class="nav__link" to="/orders">Заказы</router-link>
            </li>
            <li class="nav__item">
                <router-link class="nav__link" to="/documents">Документы</router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
.nav {

    &__list {
        @include flex-center;
        list-style: none;
    }

    &__item {
        margin: 0 10px;
        text-transform: uppercase;
    }
}
</style>