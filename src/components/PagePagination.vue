<template>
    <div class="page-pagination">
        <div class="page-pagination__wrapper">
            <button class="page-pagination__item-previous" 
                    :disabled="isPreviousDisabled" 
                    @click="previousPage">
                    Предыдущая страница
            </button>
            <button class="page-pagination__item-previous" 
                    :disabled="isNextDisabled" 
                    @click="nextPage">
                    Следующая страница
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const props = defineProps({
    perPage: {
        type: Number,
        default: 20
    },
    totalItems: {
        type: Number,
        required: true
    }
})
const currentPage = computed(() => {
    return Number(route.query.from) || 0
})
const isNextDisabled = computed(() => props.totalItems <= currentPage.value + props.perPage)
const isPreviousDisabled = computed(() => currentPage.value <= 0)
const previousPage = () => {
    router.push({query: {from: (currentPage.value - props.perPage) < 0 ? 0 : currentPage.value - props.perPage, size: props.perPage}}) 
}
const nextPage = () => {
    router.push({query: {from: currentPage.value + props.perPage, size: props.perPage}})
}
</script>

<style scoped lang="scss">
.page-pagination {
    
    &__wrapper {
        display: flex;
        justify-content: center;
    }

    &__item-next,
    &__item-previous {
        font-size: 16px;
        text-transform: uppercase;
        padding: 10px;
        margin: 0 20px;
        background: #d1eadf;
        border-radius: 3px;

        :disabled {
            background: #d1eadf;
        }
    }
}

button {
    border: none;
}
</style>