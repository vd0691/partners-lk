<template>
    <span v-if="counter " class="counter">
        {{ counter }}
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const counter = computed(() =>  store.getters.GET_CART_TOTAL.totalAmount)

</script>

<style scoped lang="scss">
.counter {
    vertical-align: top;
    color: #000;
    font-size: 17px;
    background: #fff;
    padding: 1px 12px;
    border-radius: 5px;
}
</style>