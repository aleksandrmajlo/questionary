<template>
    <div :id="'task_'+$store.state.activeAnswerBlock2">
        <div class="col-lg-12 m-b-20">
            <label class="strong">
                {{item.title}}
            </label>
        </div>

        <div class="col-lg-12 m-b-30">
            <img :src="item.photo" @load="load"
                 class="img-fluid"
                 alt=""/>
        </div>

        <div   class="col-lg-12">
            <div class="form-group">
                <textarea
                        @input="setTextValueBlock2($event)"
                        class="form-control"></textarea>
            </div>
        </div>


        <div class="col-lg-12">
            <Timer  v-if="showTimer" />
        </div>



    </div>
</template>

<script>
    import Timer from '../TimerComponent'
    export default {
        name: "WordColor",
        components:{Timer},
        data(){
            return {
                showTimer:false,
            }
        },
        computed: {
            item() {
                return this.$store.getters.item2
            }
        },
        mounted(){

        },
        methods:{
            load(){
                this.$store.commit('TimerStart');
                this.showTimer=true;
            },
            setTextValueBlock2(event){
                let val=event.target.value;
                this.$store.commit('setTextValueBlock2',val)
            }
        }
    }
</script>

<style scoped>

</style>