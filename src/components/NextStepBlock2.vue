<template>
    <div>
        <a @click.prevent="$store.commit('nextStepBlock2')" class="btn btn-primary"  href="#">{{this.$store.state.langune.showZadan}}</a>
    </div>
</template>

<script>
    export default {
        name: "NextBlock2"
    }
</script>

<style scoped>

</style>