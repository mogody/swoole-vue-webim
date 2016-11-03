import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//create a pbject to save the state of app at start
const state = {

    currentUser : {
        id : 13,
        avatar : 'http://tva3.sinaimg.cn/crop.0.0.200.200.50/701cac0cjw8ez3nd2wa7rj205k05kt8v.jpg',
        nickname : 'jack'
    },
    users : [
        {
            id : 0,
            avatar : 'http://tva3.sinaimg.cn/crop.0.0.746.746.50/a157f83bjw8f5rr5twb5aj20kq0kqmy4.jpg',
            nickname : '相约江湖'
        },
        {
            id: 10,
            avatar: 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
            nickname: 'kitty'
        },
        {
            id: 11,
            avatar: 'http://tva1.sinaimg.cn/crop.0.0.1080.1080.180/005G1fL8jw8evigk5jgacj30u00u0jv0.jpg',
            nickname: 'summer'
        },
        {
            id: 12,
            avatar: 'http://tva3.sinaimg.cn/crop.0.0.720.720.180/67dc8345jw8eh4b7kn99rj20k00k075o.jpg',
            nickname: 'snake'
        },
        {
            id: 14,
            avatar: 'http://tva2.sinaimg.cn/crop.0.0.512.512.180/75e32eebjw8f4f8ow8b6cj20e80e83z7.jpg',
            nickname: 'hello'
        }
    ],
    filterUser: '',

    currentSession : {
        id : 10,
        nickname : 'kitty',
        avatar : 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
        chat : null
    },

    chats : [
        
    ],

    broadcast : [
        {
            id : 0,
            user : {
                id: 10,
                avatar: 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
                nickname: 'kitty'
            },
            time : '2016-09-26 15:36',
            msg : 'this is the first message'
        },
        {
            id : 1,
            user : {
                id: 10,
                avatar: 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
                nickname: 'kitty'
            },
            time : '2016-09-26 15:36',
            msg : 'this is the second message'
        },
        {
            id : 2,
            user : {
                id: 11,
                avatar: 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
                nickname: 'summer'
            },
            time : '2016-09-26 15:36',
            msg : 'this is the third message'
        },
        {
            id : 3,
            user : {
                id: 13,
                avatar: 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
                nickname: 'hello'
            },
            time : '2016-09-26 15:36',
            msg : 'this is the fource message'
        },
        {
            id : 4,
            user : {
                id: 12,
                avatar: 'http://tva3.sinaimg.cn/crop.0.0.132.132.180/a755c923jw8ezf8vrhy9rj203o03omwz.jpg',
                nickname: 'snake'
            },
            time : '2016-09-26 15:36',
            msg : 'this is the fifth message'
        }
    ],

    connection : null
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

    SET_CONN: (state, conn) => {
        if (conn != null && state.connection == null) {
            state.connection = conn;
        }
    
    }
}

export default new Vuex.Store({
    state,mutations
});