<template>
    <div v-show="$store.getters.prevActive">
        <a @click.prevent="$store.commit('prevStep')" class="btn btn-primary"  href="#">{{this.$store.state.langune.prev}}</a>
    </div>
</template>

<script>
    export default {
        name: "Prev"
    }
</script>
