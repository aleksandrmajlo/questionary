<template>
    <div>
        <div class="progress" v-show="process>0">
            <div class="progress-bar"
                 role="progressbar"
                 :style="'width: '+process+'%;'"
                 :aria-valuenow="process"
                 aria-valuemin="0" aria-valuemax="100">{{process}}%</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Progress",
        computed:{
            process(){
                return this.$store.getters.progressMy;
            }
        }
    }

</script>

<style scoped>

</style>