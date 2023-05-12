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
import { scrollToTop } from '@/helpers/ScrollToTop';
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
    scrollToTop(0, 0) 
}
const nextPage = () => {
    router.push({query: {from: currentPage.value + props.perPage, size: props.perPage}})
    scrollToTop(0, 0)
}
</script>

<style scoped lang="scss">
.page-pagination {
    margin: 20px 0;
    
    &__wrapper {
        display: flex;
        justify-content: center;
    }

    &__item-next,
    &__item-previous {
        font-size: 14px;
        color: #fff;
        text-transform: uppercase;
        padding: 10px;
        margin: 0 20px;
        background: #626262;
        border-radius: 3px;

        :disabled {
            background: #727272;
        }
    }
}

button {
    border: none;
}
</style>