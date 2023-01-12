<template>
    <div id="default-layout">
        <div class="page">
            <div class="page__wrapper" >
                <TheHeader/>
                <div class="page__content container">
                <main>
                    <slot/>
                </main>
               </div>
            </div>  
        </div>
    </div>   
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';


</script>