<template>
    <div class="select-box">
        <div class="select-box__wrapper">
            <div class="quantity-selector">
                <label class="quantity-selector__label" for="quantity-selector">Показывать по:</label>
                <select
                    class="quantity-selector__options-list" 
                    name="quantity-selector" 
                    id="quantity-selector" 
                    @change="changeItemsNumber(($event.target as HTMLSelectElement).value)"
                >
                    <option selected value="20">20</option>
                    <option :selected="selectValue === 60" value="60">60</option>
                    <option :selected="selectValue === 100" value="100">100</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore()
const route = useRoute()
const selectValue = computed(() => store.state.dataSort.perPage)
const changeItemsNumber = (value:string) => {
    router.push({query: {from: route.query.from, size: value}})
    store.dispatch('GET_PER_PAGE', Number(value))
}



</script>

<style scoped lang="scss">
.quantity-selector {

    &__label {
        margin-right: 10px;
    }
}
</style>