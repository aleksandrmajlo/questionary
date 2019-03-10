import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

        languneThis: languneThis,
        langune: {},

        block1: {},
        block2: {},

        block1Key: [],
        block2Key: [],

        activeAnswer: false, // активный ключ на данный момент,
        activeAnswerBlock2: false, // активный ключ на данный момент блока два

        next: false,//кнопка перехода на следующий шаг

        setnext2: false, //кнопка перехода на блок2,
        next2: false, //кнопка перехода на блок2,
        showFormButton: false,//показать форму кнопка

        showForm: false,//показать форму

        timerStop: false,// таймер останавливаем

    },
    getters: {
        // активный номер -текст в заголовке
        keyActive: state => {
            let index = state.block1Key.indexOf(state.activeAnswer);
            return index + 1;
        },

        // активный номер  задания-текст в заголовке
        keyActiveBlock2: state => {
            let index = state.block2Key.indexOf(state.activeAnswerBlock2);
            return index + 1;
        },

        // активный блок вопроса
        item: state => {
            return state.block1[state.activeAnswer];
        },
        // активная кнопка назад
        prevActive: state => {
            let index = state.block1Key.indexOf(state.activeAnswer);
            if (index > 0) {
                return true;
            } else {
                return false;
            }
        },
        // активное задание
        item2: state => {
            return state.block2[state.activeAnswerBlock2];
        },
        // progress
        progressMy: state => {
            if (!state.activeAnswer && !state.activeAnswerBlock2) return 0;

            let keys = Object.keys(state.block1);
            let keys2 = Object.keys(state.block2);
            var index = 0;

            if (state.activeAnswer) {
                index = state.block1Key.indexOf(state.activeAnswer);
            }
            if (state.activeAnswerBlock2) {
                index = state.block2Key.indexOf(state.activeAnswerBlock2) + keys.length;
            }
            let progress = (index + 1) * 100 / (keys.length + keys2.length);
            return Math.round(progress);
        },

    },

    mutations: {

        setLangtext(state, data) {
            state.langune = data;
        },

        setBlock1(state, data) {
            state.block1 = data;
            let keys = Object.keys(data);
            state.block1Key = keys;
            this.commit("setActiveAnswer", keys[0]);
        },

        // ключ активного окна
        setActiveAnswer(state, answer) {
            state.activeAnswer = answer;
            this.commit('validation');
        },

        // установить значение текстового поля
        setValText(state, val) {
            state.block1[state.activeAnswer].val = val;
            this.commit("validation");
        },

        setValCheck(state) {
            if (this.getters.item.type == "radio") {
                var elems = document.getElementsByName(state.activeAnswer);
            } else {
                var elems = document.getElementsByName(state.activeAnswer + '[]');
            }
            let res = [];
            if (elems.length > 0) {
                elems.forEach(el => {
                    if (el.checked) {
                        res.push(el.value);
                    }
                })
                state.block1[state.activeAnswer].val = res;
            }
            this.commit("validation");
        },
        // для чекбоксов да или нет
        setValYesNot(state, val) {
            state.block1[state.activeAnswer].val = [val];
            this.commit("validation");

            setTimeout(()=>{
                this.commit('nextStep');
            },700);


        },

        // валидация
        validation(state) {
            if (this.getters.keyActive === state.block1Key.length) {
                state.next = false;
                state.setnext2 = true;
                return;
            }
            const item = this.getters.item;
            if (item.req) {
                switch (item.type) {
                    case "text":
                        if (item.val == "") {
                            state.next = false;
                        } else {
                            state.next = true;
                        }
                        break;
                    case "number":
                        if (item.val == "") {
                            state.next = false;
                        } else {
                            state.next = true;
                        }
                        break;
                    case "textarea":
                        if (item.val == "") {
                            state.next = false;
                        } else {
                            state.next = true;
                        }
                        break;
                    case "radio":
                    case "checkbox":
                        if (Array.isArray(item.val)) {
                            if (item.val.length > 0) {
                                state.next = true;
                            } else {
                                state.next = false;
                            }
                        } else {
                            state.next = false;
                        }
                        break;

                    default:
                        break;
                }
            }
            else {
                state.next = true;
            }

        },

        //следующия шаг
        nextStep(state) {
            let index = state.block1Key.indexOf(state.activeAnswer);
            if (state.block1Key[index + 1]) {
                this.commit("setActiveAnswer", state.block1Key[index + 1]);
            }
        },

        // вернуться назад
        prevStep(state) {
            let index = state.block1Key.indexOf(state.activeAnswer);
            if (state.block1Key[index - 1]) {
                this.commit("setActiveAnswer", state.block1Key[index - 1]);
                state.next2 = false;
                state.setnext2 = false;
            }
        },

        // перейти к заданиям
        nextStepBlock2(state) {
            state.setnext2 = false;
            state.activeAnswer = false;

            let keys = Object.keys(state.block2);
            state.block2Key = keys;
            state.activeAnswerBlock2 = keys[0];

        },

        //*************** Блок 2 Задания **************************************
        // валидация шага 2
        validation2(state) {
            let item = state.block2[state.activeAnswerBlock2];
            switch (item.type) {
                case "example":
                    let b = true;
                    item.items.forEach(el => {
                        if (el.answer == "") b = false;
                    });
                    if (b) {
                        state.next2 = true;
                    } else {
                        state.next2 = false;
                    }
                    break;

                case "word":
                case "guess_figures":
                    state.next2 = true; 
                    break;
                case "wordcolor" :
                    if(item.val==""){
                        state.next2=false;
                    }else{
                        state.next2=true;
                    }
                    break;

                case "wordphoto":

                    if(item.val==""){
                        state.showFormButton=false;
                    }else{
                        state.showFormButton=true;
                    }

                 break;

            }
        },

        setBlock2(state, data) {
            state.block2 = data;
        },
        // установить текстовое значение для цветных слов
        setTextValueBlock2(state, val) {
            state.block2[state.activeAnswerBlock2].val = val;
            this.commit('validation2');
        },

        // установить при подсчете примеров
        exampleSetValue(state, data) {
            state.block2[state.activeAnswerBlock2].items[data.ind].answer = data.val;
            this.commit('validation2');

        },

        // установить время таймера для активного вопроса
        setTimerVal(state, data) {
            state.block2[state.activeAnswerBlock2].timer = data.timer;
        },

        // переход к следующему заданию
        nextStep2(state) {
            let index = state.block2Key.indexOf(state.activeAnswerBlock2);
            if (state.block2Key[index + 1]) {
                state.activeAnswerBlock2 = state.block2Key[index + 1];
                state.timerStop = true;// вырубить таймеры
                state.next2=false;
            }
        },

        // дать добро на запуск таймера
        TimerStart(state) {
            state.timerStop = false;
        },

        // trigger активный ответ фото
        showStateResult(state, data) {
            state.block2[state.activeAnswerBlock2].results[data.ind].bol = !state.block2[state.activeAnswerBlock2].results[data.ind].bol;
            if(!state.next2){
                state.next2=true;
            }
        },

        // показать форму
        setShowForm(state){
            state.showForm=true;
            state.activeAnswerBlock2=false;
            state.showFormButton=false;
            state.timerStop = true;// вырубить таймеры
        }
    },

    actions: {


        // получаем текст
        getLang({commit, state}) {
            let name = "text_" + state.languneThis + ".json";
            let url =
                dirJson +
                name + "?time=" +
                new Date().getTime();
            Vue.axios.get(url).then(response => {
                this.commit("setLangtext", response.data);
            });
        },

        // получаем все вопросы
        getBlock1({commit, state}) {
            let name = "block1_" + state.languneThis + ".json";
            let url =
                dirJson +
                name+"?time=" +
                // "block1_test.json?time=" +
                new Date().getTime();
            Vue.axios.get(url).then(response => {
                this.commit("setBlock1", response.data);
            });
        },

        // получаем все задания
        getBlock2({commit, state}) {
            let name = "block2_" + state.languneThis + ".json";
            let url =
                dirJson +
                name + "?time=" +
                new Date().getTime();
            Vue.axios.get(url).then(response => {
                this.commit("setBlock2", response.data);
            });
        }


    },


});
