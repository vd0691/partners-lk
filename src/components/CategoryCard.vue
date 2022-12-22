<template>
    <div class="category-card">
        <div class="category-card__wrapper">
            <router-link :to="`/category/${id}`" class="category-card__full-detail">
                <div class="category-card__title">
                    <p class="category-card__title-text">
                        {{ props.name }}
                    </p>
                </div>                   
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    name: {type: String, required: true},
    id: {type: String, required: true}
})

</script>

<style scoped lang="scss">
.category-card {
    width: calc((100% - 120px)/4);
    height: 90px;
    margin: 15px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &__wrapper {
        height: 100%;
        @include flex-center;
    }

    &__full-detail {
        text-decoration: none;
        color: #474747;
    }

    &__title-text {
        text-transform: uppercase;
        color: #474747;
        font-size: 18px;
        line-height: 26px;
        margin: 0 10px;
    }
    &:hover {
        background: #e6e6e6;
    }
}

</style>