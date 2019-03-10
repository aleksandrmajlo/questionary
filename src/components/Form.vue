<template>
    <div>

        <form @submit.prevent="onSubmit">
            <h6 class="text-center m-2" v-html="$store.state.langune.form.title"></h6>
            <div class="form-group">
                <label for="exampleInputEmail1">{{$store.state.langune.form.email}}</label>
                <input type="email"
                       v-model="email"
                       :class="{'is-invalid':errEmail&&submitet,'is-valid':!errEmail&&submitet}"
                       class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">

            </div>

            <div class="form-group">
                <label for="name">{{$store.state.langune.form.name}}</label>
                <input type="text"
                       v-model="name"
                       @input="nameCl=true"
                       :class="{'is-invalid':errName&&submitet,'is-valid':!errName&&submitet}"
                       class="form-control" id="name">
            </div>

            <div class="form-group">
                <label for="name">{{$store.state.langune.form.phone}}</label>
                <input type="tel"
                       v-model="phone"
                       class="form-control" id="phone">
            </div>

            <button type="submit" :disabled="disabled" class="btn btn-primary">
                <span v-if="!disabled">{{$store.state.langune.form.button}} </span>
                <span v-else>{{$store.state.langune.form.send}} </span>
            </button>
        </form>

        <div class="text-success" v-if="showSuc" v-html="$store.state.langune.form.success">
        </div>

    </div>


</template>

<script>
    export default {
        name: "Form",
        data(){
            return{
                disabled:false,
                submitet:false,
                name:"",
                errName:false,
                email:"",
                errEmail:false,
                phone:'',
                errPhone:'',

                showSuc:false,
            }
        },
        methods:{
            onSubmit(){
               this.submitet=true;
               if(this.validate()){

                   this.disabled=true;

                   let formdata = new FormData();


                   formdata.append("option",'com_ajax');
                   formdata.append("module",'questionary');
                   formdata.append("format",'raw');

                   formdata.append("email",this.email);
                   formdata.append("name",this.name);
                   formdata.append("phone",this.phone);
                   formdata.append("block1",JSON.stringify(this.$store.state.block1));
                   formdata.append("block2",JSON.stringify(this.$store.state.block2));

                   const options = {
                       method: "POST",
                       data: formdata,
                       url: sendPHP
                   };
                   this.axios(options).then(response => {

                         this.showSuc=true;
                         this.disabled=false;

                         this.name="";
                         this.email="";
                         this.phone="";

                   })
                   .catch(error => {
                           console.log(error.response)
                   });


               }
            },
            validate(){
                let b=true;

                if(this.name==""){
                    b=false;
                    this.errName=true;
                }else{
                    this.errName=false;
                }
                if(this.email==""){
                    b=false;
                    this.errEmail=true;
                }else{
                    this.errEmail=false;
                }

                return b;
            }
        }
    }
</script>

<style scoped>

</style>