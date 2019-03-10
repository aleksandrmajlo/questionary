<template>
    <div   class="row justify-content-center">
        <div class="col-lg-6">
            <div class="thisAnswer">
                <h2 class="text-center m-b-20">{{$store.state.langune.title_block2}} <span class="this_key">{{$store.getters.keyActiveBlock2}}.</span></h2>

                <div v-if="item.type=='example'">
                     <Example/>
                </div>
                <div v-else-if="item.type=='guess_figures'"  >
                    <Guessfigures/>
                </div>
                <div v-else-if="item.type=='word'"  >
                    <Word/>
                </div>
                <div v-else-if="item.type=='wordcolor'"  >
                    <WordColor/>
                </div>
                <div v-else-if="item.type=='wordphoto'"  >
                    <WordPhoto/>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import TimerComponent from './TimerComponent'
    import Guessfigures from './Type/GuessFigures'
    import Word from './Type/Word'
    import Example from './Type/Example'
    import WordColor from './Type/WordColor'
    import WordPhoto from './Type/WordPhoto'

    export default {
        name: "Block2",
        components: {
            TimerComponent,
            Guessfigures,
            Word,
            Example,
            WordColor,
            WordPhoto
        },
        computed: {
            item() {
                return this.$store.getters.item2
            }
        },

    }
</script>

<style scoped lang="scss">


</style>