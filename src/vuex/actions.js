export default {
    //the first arg is the instance of Vuex.Store , another is custom

    searchUser: function({ dispatch }, filterUser){
        dispatch('FILTER_USER', filterUser);
    },

    selectSession : function({ dispatch }, userId){
        dispatch('CHANGE_SESSION', userId);
    },

    setUser : function({ dispatch }, user){
        if (user.id && user.avatar && user.nickname) {
            dispatch('SET_USER', user);
        }
    },

    setConn : function({ dispatch }, conn){
        dispatch('SET_CONN', conn);
    }
};