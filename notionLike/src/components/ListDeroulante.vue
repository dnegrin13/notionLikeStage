<script lang="ts" setup>
    import { ref } from 'vue'
    const MenuActive = ref(false)
    function ToggleActive() {
        MenuActive.value = !MenuActive.value
    }
</script>

<template>
<div>
    <button @click="ToggleActive"><v-icon fill="blue" name="bi-arrow-right-short" alt="Menu déroulant" /></button>
    <div id="MenuContainer" :class="{MenuActive}">
        <slot class="position"></slot>
    </div>
</div>
</template>

<style>
    #MenuContainer {
        display: none;
        position: absolute;
        background-color: white;
        border: 2px solid black;
    }

    .position {
        position: relative;
    }

    #MenuContainer.MenuActive {
        display: block;
    }
</style>