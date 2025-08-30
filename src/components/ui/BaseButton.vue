<template>
  <button
    class="relative text-white py-[18px] rounded-[18px] weight-semibold cursor-pointer hover:opacity-90 transition duration-300">
    <slot />
    <slot name="icon"></slot>
  </button>
</template>

<style scoped>
button {
  background: #9dd458
}
</style>
