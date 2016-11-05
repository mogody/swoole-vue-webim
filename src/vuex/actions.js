export default {
    //the first arg is the instance of Vuex.Store , another is custom

    searchUser: ({ dispatch }, filterUser) => {
        dispatch('FILTER_USER', filterUser);
    },

    selectSession : ({ dispatch }, userId) => {
        dispatch('CHANGE_SESSION', userId);
    },

    setUser : ({ dispatch }, user) => {
        if (user.id && user.avatar && user.nickname) {
            dispatch('SET_USER', user);
        }
    },

    addUser : ({ dispatch }, user) => {
        if (user instanceof Array || user.id && user.avatar && user.nickname) {
            dispatch('ADD_USER', user);
        }
    },

    removeUser : ({ dispatch }, userId) => {
        dispatch('REMOVE_USER', userId);
    },

    setConn : ({ dispatch }, conn) => {
        dispatch('SET_CONN', conn);
    },

    changeStatus : ({ dispatch }, status) => {
        dispatch('CHANGE_STATUS', status);
    },

    addMessage : ({ dispatch }, message) => {
        if (message.is_self != 1) {
            let userId = message.to == 0 ? 0 : message.from;
        
            dispatch('SET_HAS_MESSAGE',userId,true);
        }
        
        
        dispatch('ADD_MESSAGE',message);
    },

    setHasMessageStatus : ({ dispatch }, userId, status) => {
        dispatch('SET_HAS_MESSAGE', userId, status);
    },

    setCount : ({ dispatch }, count) => {
        dispatch('SET_COUNT', count);
    },

    showNotice : ({ dispatch }, msg, type) => {
        dispatch('SHOW_NOTICE', msg, type);
    }


};