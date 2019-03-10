<template>

        <div class="row justify-content-center" :id="'question_'+$store.state.activeAnswer">

            <div class="col-lg-6">
                <div class="thisAnswer">
                    <h2 class="text-center m-b-20">{{$store.state.langune.title_block1}} <span class="this_key">{{$store.getters.keyActive}}.</span></h2>

                    <div v-if="item.type=='text'" class="form-group">
                        <label class="strong">
                            {{item.title}}
                        </label>
                        <input @input="setValText($event)" :value="item.val"
                               :class="{'is-invalid':item.req&&item.val=='','is-valid':item.req&&item.val!==''}"
                               type="text" class="form-control "/>
                    </div>

                    <div v-else-if="item.type === 'number'" class="form-group">
                        <label class="strong">
                            {{item.title}}
                        </label>
                        <input @input="setValText($event)" :value="item.val" :min="item.min ? item.min :0 "
                               :class="{'is-invalid':item.req&&item.val=='','is-valid':item.req&&item.val!==''}"
                               type="number" class="form-control"/>
                    </div>

                    <div v-else-if="item.type === 'textarea'" class="form-group">
                        <label class="strong">
                            {{item.title}}
                            <!--<span class="req" v-show="item.req">*</span>-->
                        </label>
                        <textarea @input="setValText($event)"
                                  :name="$store.state.activeAnswer"
                                  :value="item.val"
                                  :class="{'is-invalid':item.req&&item.val=='','is-valid':item.req&&item.val!==''}"
                                  class="form-control">
                        </textarea>
                    </div>

                    <div v-else-if="item.type === 'checkbox'" class="form-group">
                        <label class="strong">
                            {{item.title}}
                            <!--<span class="req" v-show="item.req">*</span>-->
                        </label>
                        <template v-if="item.items">
                            <div class="radio_block">
                                <div v-for="(it,index) in item.items " :key="index"
                                     class="form-check form-check-inline">
                                    <input @input="$store.commit('setValCheck')" class="form-check-input" type="checkbox"
                                           :checked="Array.isArray(item.val)&&item.val.indexOf(it)!==-1"
                                           :name="$store.state.activeAnswer+'[]'" :id="$store.state.activeAnswer+index"
                                           :value="it">
                                    <label class="form-check-label"
                                           :for="$store.state.activeAnswer+index">{{it}}</label>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div v-else-if="item.type === 'radio'" class="form-group">
                        <label class="strong">
                            {{item.title}}
                            <!--<span class="req" v-show="item.req">*</span>-->
                        </label>
                        <template v-if="item.items">
                            <div class="radio_block">
                                <div v-for="(it,index) in item.items " :key="index" class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio"
                                           :checked="Array.isArray(item.val)&&item.val.indexOf(it)!==-1"
                                           @input="$store.commit('setValCheck')"
                                           :name="$store.state.activeAnswer" :id="$store.state.activeAnswer+index"
                                           :value="it">
                                    <label class="form-check-label" :for="$store.state.activeAnswer+index">{{it}}</label>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="row">

                                <div class="col-lg-6 text-center">
                                    <div class="inputGroup">
                                        <input class="form-check-input" type="radio"
                                               :checked="Array.isArray(item.val)&&item.val.indexOf('Нет')!==-1"
                                               @input="setValYesNot($event)" :name="$store.state.activeAnswer"
                                               :id="$store.state.activeAnswer+'2'" value="Нет">
                                        <label class="form-check-label" :for="$store.state.activeAnswer+'2'">Нет</label>
                                    </div>
                                </div>

                                <div class="col-lg-6 text-center">
                                    <div class="inputGroup">
                                        <input class="form-check-input" type="radio"
                                               @input="setValYesNot($event)"
                                               :checked="Array.isArray(item.val)&&item.val.indexOf('Да')!==-1"
                                               :name="$store.state.activeAnswer" :id="$store.state.activeAnswer+'1'" value="Да">
                                        <label class="form-check-label" :for="$store.state.activeAnswer+'1'">Да</label>
                                    </div>
                                </div>

                            </div>

                        </template>

                    </div>


                </div>
            </div>
        </div>

</template>

<script>
    export default {
        name: "Block1",
        components: {},
        computed: {
            item() {
                return this.$store.getters.item
            }
        },
        methods: {
            setValText(event) {
                let v = event.target.value;
                this.$store.commit('setValText', v);
            },
            setValYesNot(event){
                let v = event.target.value;
                this.$store.commit('setValYesNot', v);
            }
        },
    }
</script>

<style scoped lang="scss">


</style>