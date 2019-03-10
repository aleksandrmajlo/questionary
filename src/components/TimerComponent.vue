<template>
    <div>
        <div id="timer">
            <span id="minutes">{{ minutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ seconds }}</span>
        </div>
    </div>
</template>

<script>
    export default {
       data(){
         return{
             timer: null,
             totalTime: 0,
         }
       },
        mounted(){
           this.startTimer();
        },
        computed: {
            minutes: function() {
                const minutes = Math.floor(this.totalTime / 60);
                return this.padTime(minutes);
            },
            seconds: function() {
                const seconds = this.totalTime - (this.minutes * 60);
                return this.padTime(seconds);
            }
        },
        methods: {
            startTimer: function() {

                this.timer = setInterval(() => this.countdown(), 1000);
                this.resetButton = true;
            },
            countdown: function() {
                    if(this.$store.state.timerStop){
                        this.resetTimer();
                        // console.info('STOP');
                        return;
                    }
                    this.totalTime++;
                    // console.info('WORK');
                    this.$store.commit('setTimerVal',{
                        timer:this.minutes+":"+this.seconds
                    })

            },
            resetTimer: function() {
                // this.totalTime = 0;
                clearInterval(this.timer);
                // this.timer = null;
            },
            padTime: function(time) {
                return (time < 10 ? '0' : '') + time;
            },
        }
    }
</script>

<style scoped lang="scss" >

</style>