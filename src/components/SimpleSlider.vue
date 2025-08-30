<script setup>

import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { Navigation as CarouselNavigation } from 'vue3-carousel'

import slide1 from '@/assets/img/slide-1.png'

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 5000,
  gap: 300,
  transition: 500
}

const slides = [
  {
    id: 1,
    title: 'Slide 1',
    image: slide1
  },
  {
    id: 2,
    title: 'Slide 2',
    image: slide1
  },
  {
    id: 3,
    title: 'Slide 3',
    image: slide1
  },
  {
    id: 4,
    title: 'Slide 4',
    image: slide1
  },
  {
    id: 5,
    title: 'Slide 5',
    image: slide1
  }
]
</script>

<template>
  <Carousel v-bind="carouselConfig" class="py-[45px] px-[60px] bg-white">

    <Slide v-for="slide in slides" :key="slide.id">
      <div class="w-full">
        <img :src="slide.image" :alt="slide.title" class="w-full" />
      </div>
    </Slide>

    <template #addons>
      <CarouselNavigation>

        <template #prev>
          <span
            class="rounded-full bg-white hover:bg-gray-50 transition duration-300 w-[35px] h-[35px] flex justify-center items-center shadow-md cursor-pointer rotate-180 border border-gray-300 absolute left-[40px]">
            <img src="@/assets/icons/arrow-right.svg" alt="Previous" />
          </span>
        </template>

        <template #next>
          <span
            class="rounded-full bg-white hover:bg-gray-50 transition duration-300 w-[35px] h-[35px] flex justify-center items-center shadow-md cursor-pointer border border-gray-300 absolute right-[40px]">
            <img src="@/assets/icons/arrow-right.svg" alt="Next" />
          </span>
        </template>

      </CarouselNavigation>
    </template>

  </Carousel>
</template>

<style scoped>
:deep(.carousel__prev) {
  @apply w-[35px] h-[35px];
}

:deep(.carousel__next) {
  @apply w-[35px] h-[35px];
}
</style>
