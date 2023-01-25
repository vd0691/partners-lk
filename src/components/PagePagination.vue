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
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const emit = defineEmits(['change-page'])
const props = defineProps({
    perPage: {
        type: Number,
        default: 20
    },
    totalItems: {
        type: Number,
        default: 20
    }
})
const currentPage = computed(() => {
    return Number(route.query.from) || 0
})

const isNextDisabled = computed(() => false)
const isPreviousDisabled = computed(() => currentPage.value === 0)
const previousPage = () => {
    const current = currentPage.value - props.perPage
    router.push({query: {from: current, size: props.perPage}})
    window.scrollTo({top: 100})
}
const nextPage = () => {
    const current = currentPage.value + props.perPage
    router.push({query: {from: current, size: props.perPage}})
    window.scrollTo({top: 100})
}

watch([currentPage, () => props.perPage], (data) => {
    emit('change-page', data)
}, {immediate:true})
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