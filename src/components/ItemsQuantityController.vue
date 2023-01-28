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
                    <option :selected="selectValue === '60'" value="60">60</option>
                    <option :selected="selectValue === '100'" value="100">100</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const selectValue = computed(() => route.query.size)
const changeItemsNumber = (value:string) => {
    router.push({query: {from: route.query.from, size: value}})
}

</script>