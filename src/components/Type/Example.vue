<template>
    <div  :id="'task_'+$store.state.activeAnswerBlock2">
        <div class="col-lg-12">
            <label class="strong">
                {{item.title}}
            </label>
        </div>
        <div class="row">
            <div v-for="(it,ind) in item.items" class=" col-md-6 m-b-10">
                <div class="d-flex align-items-center">
                    <span class="zadan text-nowrap">{{it.zadan}}</span>
                    <input  @input="exampleSetValue(ind,$event)"
                            :class="{'is-invalid':it.answer=='','is-valid':it.answer!==''}"
                            :val="it.answer"
                            class="form-control" type="text"/>
                </div>
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
        name: "Example",
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
            setTimeout(()=>{
                this.$store.commit('TimerStart');
                this.showTimer=true;
            },500)

        },
        methods: {
            exampleSetValue(ind,event){
                let val=event.target.value;
                this.$store.commit('exampleSetValue',{val:val,ind:ind})
            },
        }
    }
</script>

<style scoped>
    .zadan{
        display: inline-block;
        padding-right: 10px;
        min-width: 70px;
    }

</style>