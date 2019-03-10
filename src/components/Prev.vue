<template>
    <div v-show="$store.getters.prevActive">
        <a @click.prevent="$store.commit('prevStep')" class="btn btn-primary"  href="#">Предыдущий</a>
    </div>
</template>

<script>
    export default {
        name: "Prev"
    }
</script>
