<template>
    <button class="button">{{ props.text }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>