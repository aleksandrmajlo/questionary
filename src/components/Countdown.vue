<template>
    <div id="timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                timer: null,
                totaltime:this.time,
                totaltime_default:this.time
            }
        },
        props:['time'],
        mounted(){
            this.startTimer();
        },
        computed: {

            minutes: function() {
                const minutes = Math.floor(this.totaltime / 60);
                return this.padTime(minutes);
            },
            seconds: function() {
                const seconds = this.totaltime - (this.minutes * 60);
                return this.padTime(seconds);
            }
        },
        methods: {

            startTimer: function() {
                this.timer = setInterval(() => this.countdown(), 1000);
                this.resetButton = true;
            },

            countdown: function() {
                if(this.totaltime >= 1){
                    this.totaltime--;
                } else{
                    this.totaltime = 0;
                    clearInterval(this.timer);
                    this.$emit('show-result')
                }
            },

            resetTimer: function() {
                /*
                this.totaltime = (25 * 60);
                clearInterval(this.timer);
                this.timer = null;
                this.resetButton = false;
                this.title = "Let the countdown begin!!"
                */
            },

            padTime: function(time) {
                return (time < 10 ? '0' : '') + time;
            },

        }
    }
</script>

<style scoped>

</style>