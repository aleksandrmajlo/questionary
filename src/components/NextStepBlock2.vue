<template>
    <div>
        <a @click.prevent="$store.commit('nextStepBlock2')" class="btn btn-primary"  href="#">Перейти к заданиям</a>
    </div>
</template>

<script>
    export default {
        name: "NextBlock2"
    }
</script>

<style scoped>

</style>