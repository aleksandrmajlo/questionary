<template>
    <div :id="'task_'+$store.state.activeAnswerBlock2">
        <div class="col-lg-12">
            <label class="strong">
                <span v-if="itemsShow">{{item.title}}</span>
                <span v-if="!itemsShow">{{item.title2}}</span>
            </label>
        </div>
        <div v-if="itemsShow" class="d-flex justify-content-center flex-wrap mb-2">
            <div v-if="item" v-for="(it,ind) in item.items"
                 class="item_guess_figures text-center ">
                <img :src="it" @load="load(it)" class="img-fluid" />
            </div>
        </div>
        <div v-if="!itemsShow" class="d-flex justify-content-center flex-wrap mb-2 results">
            <div v-if="item" v-for="(it,ind) in item.results"
                 class="item_guess_figures text-center ">
                <a href="#" :class="{active:it.bol}" @click.prevent="stateShow(ind)">
                    <img :src="it.photo"  class="img-fluid" />
                </a>
            </div>
        </div>
        <div  v-if="itemsShow" class="col-md-12 text-center">

            <Countdown  v-if="showTimer"
                        @show-result="showResult"
                        :time="item.coutdown" />

        </div>
        <div  class="col-md-12 text-center" v-if="itemsShow">
            <button @click.prevent="$store.commit('validation2');itemsShow=false;" class="btn btn-success">{{$store.state.langune.guess_figures.button}}</button>
        </div>


    </div>
</template>
<script>
    import Countdown from '../Countdown'
    export default {
        name: "GuessFigures",
        data(){
            return {
               loadar:[],
               itemsShow:true,
            }
        },
        components:{Countdown},
        computed: {
            item() {
                return this.$store.getters.item2
            },
            showTimer(){
                if(this.loadar.length==this.item.items.length){
                    return true;
                }
                return false;
            }
        },
        methods: {
            load(ind){
                this.loadar.push(ind);
            },
            showResult(){
                this.itemsShow=false;
            },
            stateShow(ind){
                this.$store.commit('showStateResult',{ind:ind})
            }
        }

    }
</script>
<style scoped lang="scss">
    .item_guess_figures{
        width: 50%;
        box-sizing: border-box;
        padding: 10px;
    }
    .results{
       a{
           display: inline-block;
           border: 2px solid ;
           border-color: transparent;
           box-sizing: border-box;
       }
       a.active{
           border-color: blue;
       }
    }
</style>