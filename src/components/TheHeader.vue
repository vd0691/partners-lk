<template>
    <header class="header">
        <div class="header__container">
            <slot/>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    background: #404040;
    margin: 40px 0 30px;
    position: sticky;
    top: 0;
    padding: 15px 0;
    z-index: 99;
}

</style>