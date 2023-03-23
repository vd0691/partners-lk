<template>
    <div class="product-images">
        <div class="product-images__wrapper">
            <LoaderIndicator v-if="isDataLoading" />
            <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                <Slide v-for="image in productImages" :key="image.id">
                    <div class="carousel__item">
                        <img :src="`data:image/png; base64, ${image.base64}`"/>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation  v-if="productImages?.length > 1"/>
                </template>
            </Carousel>

            <Carousel
                v-if="productImages?.length > 1"
                id="thumbnails"
                :items-to-show="5"
                :wrap-around="true"
                v-model="currentSlide"
                ref="carousel"
            >
                <Slide v-for="image, index in productImages" :key="image.id">
                    <div class="carousel__item" @click="slideTo(index)">
                        <img :src="`data:image/png; base64, ${image.base64}`"/>
                    </div>
                </Slide>
            </Carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/assets/scss/carousel.css'
import { Product } from '@/interfaces/Product';
import useImagesService from '@/services/ImagesService';
import { ref, inject, onMounted } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import LoaderIndicator from './LoaderIndicator.vue';

const isDataLoading = ref(true)
const product = inject('product') as Product
const imagesService = useImagesService()
const productImages = ref()
const currentSlide = ref(0)

const slideTo = (value:number) => {
    currentSlide.value = value
}

const getImages = async () => {
    const images = await imagesService.getImagesByItemId(product.id)
    productImages.value = images
    isDataLoading.value = false
}

onMounted(() => {
    getImages()
})

</script>

<style scoped lang="scss">
.product-images {

    &__wrapper {
        min-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;        
    }
}
#gallery {
    & .carousel {
        
        &__item {
            height: 400px;

            & img {
                height: 100%;
            }
        }
    }
}
#thumbnails {
    & .carousel {
        
        &__item {
            height: 80px;

            & img {
                height: 100%;
            }
        }
        &__slide--active {
            
            & img {
                border: 2px solid #4c4c4c;
                border-radius: 4px;
            }
        }
    }
}
</style>