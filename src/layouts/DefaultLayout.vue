<template>
    <div id="default-layout">
        <TheHeader/>
        <slot />
    </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';


</script>