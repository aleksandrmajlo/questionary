<template>
    <div>
        <a @click.prevent="$store.commit('setShowForm')" class="btn btn-primary"  href="#">
            {{$store.state.langune.button.showFormButton}}
        </a>
    </div>
</template>

<script>
    export default {
        name: "showFormButton"
    }
</script>

<style scoped>

</style>