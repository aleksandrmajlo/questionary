<template>
    <div :id="'task_'+$store.state.activeAnswerBlock2">
        <div class="col-lg-12 m-b-20">
            <label class="strong">
                <span v-if="itemsShow">{{item.title}}</span>
                <span v-if="!itemsShow">{{item.title2}}</span>
            </label>
        </div>
        <div v-if="itemsShow" class="col-lg-12 justify-content-center m-b-30">
            <div class="row">
                <div v-if="item" v-for="(it,ind) in item.items"
                     class="col-md-4 text-center ">
                    <span class="word">{{it}}</span>
                </div>
            </div>
        </div>
        <div  v-if="!itemsShow" class="col-lg-12 m-b-30" >
            <div class="form-group">
                <textarea
                        @input="setTextValueBlock2($event)"
                        class="form-control"></textarea>
            </div>
        </div>
        <Countdown  v-if="showTimer"
                    @show-result="showResult"
                    :time="item.coutdown" />
        <Timer v-if="!itemsShow"/>

        <div  class="col-md-12 text-center" v-if="itemsShow">
            <button @click.prevent="$store.commit('validation2');itemsShow=false;showTimer=false;" class="btn btn-success">{{$store.state.langune.guess_figures.button}}</button>
        </div>


    </div>
</template>

<script>
    import Countdown from '../Countdown'
    import Timer from '../TimerComponent'
    export default {
        name: "Word",
        components:{Countdown,Timer},
        data(){
            return {
                showTimer:false,
                itemsShow:true,
            }
        },
        mounted(){
            setTimeout(()=>{
                this.$store.commit('TimerStart');
                this.showTimer=true;
            },500)
        },
        computed: {
            item() {
                return this.$store.getters.item2
            },

        },
        methods: {

            showResult(){
                this.itemsShow=false;
                this.showTimer=false;
            },

            setTextValueBlock2(event){
                let val=event.target.value;
                this.$store.commit('setTextValueBlock2',val)
            }
        }
    }
</script>

<style scoped lang="scss">
  .word{
      font-size: 20px;
      display: inline-block;
      margin-bottom: 10px;
  }
</style>