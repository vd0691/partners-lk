
import ModalWindow from './ModalWindow.vue';

<template>
    <div class="image-more" @click="openImages(), getImages()">
        <span><svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 512 512" xml:space="preserve" fill="#707070" stroke="#707070"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g> <path class="st0" d="M421.828,106.063H90.172v299.859h331.656V106.063z M309.844,160.781c19.125,0,34.656,15.5,34.656,34.641 s-15.531,34.641-34.656,34.641c-19.156,0-34.656-15.5-34.656-34.641S290.688,160.781,309.844,160.781z M399.813,364.688 c-2.328,4.406-6.906,7.156-11.875,7.156H129.469c-4.906,0-9.406-2.656-11.766-6.938c-2.344-4.281-2.172-9.5,0.453-13.656 l75.469-118.594c4.813-7.594,13.125-12.25,22.094-12.406c9-0.188,17.453,4.156,22.563,11.563l44.281,64.094l15.906-25.031 c4.828-7.594,13.125-12.234,22.094-12.406c9-0.172,17.438,4.156,22.563,11.547l55.828,80.828 C401.797,354.938,402.109,360.25,399.813,364.688z"></path> <path class="st0" d="M0,17.844v23.859v452.453h512v-46.828V17.844H0z M464.297,446.438H47.703V65.563h416.594V446.438z"></path> </g> </g></svg></span>
    </div>
    <ModalWindow v-if="isOpen" @close-window="closeImage">
        <div class="product-image">
            <LoaderIndicator v-if="isLoading" />
            <div v-else  class="product-image__image">
                <img :src="`data:image/png; base64, ${productImage}`"/>
            </div>
        </div>
    </ModalWindow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalWindow from './ModalWindow.vue';
import useImagesService from '@/services/ImagesService';
import LoaderIndicator from './LoaderIndicator.vue';

const isLoading = ref(true)
const imagesService = useImagesService()
const isOpen = ref(false)
const openImages = () => isOpen.value = true
const closeImage = () => isOpen.value = false
const productImage = ref()
const getImages = async () => { 
    const image = await imagesService.getImagesByItemId(props.productId || '')
    productImage.value = image[0].base64
    isLoading.value = false
}


const props = defineProps({
    productId: String
})

</script>

<style scoped lang="scss">
.image-more {
    margin-left: 10px;

    &:hover {
        cursor: pointer;
    }
}

.product-image {
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1024px) {
        min-height: 400px;
    }

    &__image {
        height: 500px;
        display: flex;
        justify-content: center;

        @media screen and (max-width: 1024px) {
            height: 400px;
        }

        & img {
            height: 100%;
        }
    }
}
</style>