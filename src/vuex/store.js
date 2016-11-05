import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//create a pbject to save the state of app at start
const state = {
    //the user of current
    currentUser : {
        id : 13,
        avatar : 'http://tva3.sinaimg.cn/crop.0.0.200.200.50/701cac0cjw8ez3nd2wa7rj205k05kt8v.jpg',
        nickname : 'jack'
    },
    //all users
    users : [
        {
            id : 0,
            nickname : '群聊',
            avatar : 'http://58pic.ooopic.com/58pic/12/25/04/02k58PICVwf.jpg',
            has_message : false
        }
    ],
    filterUser: '',

    currentSession : {
        id : 0,
        nickname : '群聊',
        avatar : 'http://b.hiphotos.baidu.com/exp/w=480/sign=d86a96f25766d0167e199f20a72ad498/b8014a90f603738d48c6191db61bb051f819ec05.jpg',
        chat : null
    },

    currentCount : 0,

    online : false,

    broadcast : [],

    connection : null,

    notice : {
        show : false,
        type : '',
        msg : ''
    }
}

//create a object to save the function of mutation
const mutations = {

    FILTER_USER: (state, nickname) => {
        state.filterUser = nickname;
    },

    CHANGE_SESSION: (state, userId) => {
        for (var i = state.users.length - 1; i >= 0; i--) {
            if (state.users[i].id != userId) {
                continue;
            }
            state.currentSession = state.users[i];
            break;
        }
    },

    SET_USER: (state, user) => {
        state.currentUser = user;
    },

    ADD_USER: (state, user) => {
        if (user instanceof Array) {

            for (var i = user.length - 1; i >= 0; i--) {
                if (user[i].id != state.currentUser.id) {
                    user[i].has_message = false;
                    state.users.push(user[i]);
                }
                
            }
        }else{
            user.has_message = false;
            state.users.push(user);
        }
    
    },

    REMOVE_USER: (state, userId) => {
        state.users.forEach((item,index) => {
            if (item.id == userId) {
                state.users.$remove(item);
            }
        });
    },

    SET_CONN: (state, conn) => {
        if (conn != null && state.connection == null) {
            state.connection = conn;
        }
    
    },

    CHANGE_STATUS: (state, status) => {
        state.online = status;
    },

    ADD_MESSAGE: (state, message) => {
        let msg = {
            user : {
                id : message.from,
                avatar : '',
                nickname : ''
            },
            msg : message.msg,
            time : message.date
        };
        if (message.from == state.currentUser.id) {
            msg.user = state.currentUser;
        }else{
            for (var i = state.users.length - 1; i >= 0; i--) {
                if (state.users[i].id == message.from) {
                    msg.user = state.users[i];
                    break;
                }
            }
        }

        if (message.to == 0) {
            if (state.broadcast[ 0 ] == undefined) {
                state.broadcast[ 0 ] = new Array;
            }

            state.broadcast[ 0 ].push(msg);

            state.broadcast.$set(0,state.broadcast[0]);
        }else{
            if (message.is_self == 1) {
                message.from = message.to;
            }


            if (state.broadcast[ message.from ] == undefined) {
                state.broadcast[ message.from ] = new Array;
            }

            state.broadcast[ message.from ].push(msg);

            state.broadcast.$set(message.from,state.broadcast[ message.from ]);
        }

    },

    SET_HAS_MESSAGE : (state, userId, status) => {

        for (var i = state.users.length - 1; i >= 0; i--) {
            if (status == false && state.users[i].id == userId || state.users[i].id == userId && state.currentSession.id != userId ) {
                state.users[i].has_message = status;
            }
        }
    },

    SET_COUNT : (state, count) => {
        state.currentCount = count;
    },

    SHOW_NOTICE : (state, msg, type) => {
        state.notice = {
            show : true, msg, type
        }

        setTimeout(function(){
            state.notice.show = false;
        },1000);
    }
}

export default new Vuex.Store({
    state,mutations
});