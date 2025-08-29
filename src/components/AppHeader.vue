<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '@/assets/icons/logo.svg'
</script>

<template>
  <header class="pl-[45px] pr-[60px] py-[45px] bg-white rounded-t-[20px] border-b-[1px] border-b-[#eaeaea]">

    <div class="flex justify-between items-center">
      <div class="flex justify-between items-center gap-[16px]">
        <RouterLink to="/">
          <img class="" :src="logo" width="40" height="40" alt="Sneakers logo" />
        </RouterLink>

        <div>
          <h1 class="font-bold text-[20px]">VUE SNEAKERS</h1>
          <p class="text-[14px] text-[#9d9d9d]">Магазин лучших кроссовок</p>
        </div>
      </div>

      <nav>
        <ul class="flex gap-[32px] justify-between items-center text-[#5c5c5c]">

          <li class="flex items-center gap-[10px] cursor-pointer hover:text-black transition duration-500">
            <img src="@/assets/icons/cart.svg" alt="cart">
            <span class="text-[14px]">1000 руб.</span>
          </li>

          <li class="hover:text-black transition duration-500">
            <RouterLink to="/favorite" class="flex items-center gap-[10px]">
              <img src="@/assets/icons/heart.svg" alt="heart">
              <span class="text-[14px]">Favorite</span>
            </RouterLink>
          </li>

          <li class="hover:text-black transition duration-500">
            <RouterLink to="/profile" class="flex items-center gap-[10px]">
              <img src="@/assets/icons/profile.svg" alt="profile">
              <span class="text-[14px]">Profile</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

  </header>

</template>
