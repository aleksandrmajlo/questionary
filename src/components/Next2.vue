<template>
    <div>
        <a @click.prevent="$store.commit('nextStep2')" class="btn btn-primary"  href="#">{{this.$store.state.langune.next}}</a>
    </div>
</template>

<script>
    export default {
        name: "Next2"
    }
</script>

<style scoped>

</style>