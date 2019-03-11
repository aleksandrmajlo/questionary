<template>
  <div id="app">
      <transition name="fade" mode="out-in">
         <div class="container" key="start" v-if="!startTest">
         <div class="col-lg-12 m-b-40 text-center">
             <a href="#" @click.prevent="startTest=true" class="btn btn-primary btn-lg">{{this.$store.state.langune.start}}</a>
         </div>
     </div>
         <div class="container" key="work" v-else>
         <div class="row">
             <div class="col-lg-12 m-b-40">
                 <Progress/>
             </div>
             <!-- блок 1 заданий -->
             <div v-if="$store.state.activeAnswer" class="col-lg-12 m-b-40" >
                 <block1/>
             </div>
             <!-- блок 2 заданий -->
             <div  v-if="$store.state.activeAnswerBlock2" class="col-lg-12 m-b-40">
                 <block2></block2>
             </div>
             <div class="col-lg-12">
                 <div class="row">
                     <div class="col-lg-6 text-center">
                         <Prev/>
                     </div>
                     <div class="col-lg-6 text-center"  v-show="$store.state.next">
                         <Next/>
                     </div>
                     <!--переход к заданиям -->
                     <div class="col-lg-6 text-center"  v-show="$store.state.setnext2">
                         <NextStepBlock2/>
                     </div>
                     <div class="col-lg-6 text-center"  v-if="$store.state.next2">
                         <Next2/>
                     </div>
                     <div class="col-lg-6 text-center"  v-if="$store.state.showFormButton">
                         <showFormButton/>
                     </div>
                 </div>
                 <div class="row justify-content-center"  v-if="$store.state.showForm">
                     <div class="col-lg-6" >
                         <Form/>
                     </div>
                 </div>
             </div>

         </div>
     </div>
      </transition>
  </div>
</template>

<script>
import block1 from './components/Block1.vue'
import block2 from './components/Block2.vue'
import Progress from './components/Progress'
import Next from "./components/Next";
import Prev from "./components/Prev";
import NextStepBlock2 from './components/NextStepBlock2.vue'
import Next2 from "./components/Next2.vue";
import showFormButton from "./components/showFormButton";
import Form from "./components/Form";
export default {
  name: 'app',
  data(){
        return {
            startTest:false
        }
  },
  components: {
      Next,
      Prev,
      NextStepBlock2,
      Next2,
      block1,
      block2,
      Progress,
      showFormButton,
      Form
  },
  mounted(){

     this.$store.dispatch('getLang');
     this.$store.dispatch('getBlock1');
     this.$store.dispatch('getBlock2');
  },
   methods:{
     
   }
}
</script>

<style lang="scss">
#app {
  @import '../node_modules/bootstrap/scss/bootstrap.scss';

    .m-b-40{
         margin-bottom: 40px;
    }

    .m-b-30{
         margin-bottom: 30px;
    }

    .m-b-20{
         margin-bottom: 20px;
    }

    .m-b-10{
         margin-bottom: 10px;
    }

    .thisAnswer {
        display: block;
        box-sizing: border-box;
        padding: 2rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
        -webkit-box-shadow: 0 0 4px 4px rgba(0,0,0,0.5) ;
        box-shadow: 0 0 4px 4px rgba(0,0,0,0.5) ;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.2) ;

        label {
            display: block;
        }
        label.strong {
            font-weight: bold;
        }
        .req {
            color: red;
        }
        .this_key {
            display: inline-block;
            margin-right: 5px;
        }
    }


    .inputGroup {
        background-color: #fff;
        display: block;
        margin: 10px 0;
        position: relative;
        label {
            padding: 12px 30px;
            width: 100%;
            display: block;
            text-align: left;
            color: #3C454C;
            cursor: pointer;
            position: relative;
            z-index: 2;
            transition: color 200ms ease-in;
            overflow: hidden;

            &:before {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                content: '';
                background-color: #5562eb;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale3d(1, 1, 1);
                transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
                opacity: 0;
                z-index: -1;
            }

            &:after {
                width: 32px;
                height: 32px;
                content: '';
                border: 2px solid #D1D7DC;
                background-color: #fff;
                background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
                background-repeat: no-repeat;
                background-position: 2px 3px;
                border-radius: 50%;
                z-index: 2;
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
                transition: all 200ms ease-in;
            }
        }
        input:checked ~ label {
            color: #fff;

            &:before {
                transform: translate(-50%, -50%) scale3d(56, 56, 1);
                opacity: 1;
            }

            &:after {
                background-color: #54E0C7;
                border-color: #54E0C7;
            }
        }
        input {
            width: 32px;
            height: 32px;
            order: 1;
            z-index: 2;
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            visibility: hidden;
        }
    }

    #timer{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.7s ease-out;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

</style>
