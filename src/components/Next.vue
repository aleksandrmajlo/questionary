<template>
    <div>
        <a @click.prevent="$store.commit('nextStep')" class="btn btn-primary"  href="#">{{this.$store.state.langune.next}}</a>
    </div>
</template>

<script>
    export default {
        name: "Next",
        methods :{

        }
    }
</script>
