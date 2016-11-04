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

    addUser : function({ dispatch }, user){
        if (user instanceof Array || user.id && user.avatar && user.nickname) {
            dispatch('ADD_USER', user);
        }
    },

    removeUser : function({ dispatch }, userId){
        dispatch('REMOVE_USER', userId);
    },

    setConn : function({ dispatch }, conn){
        dispatch('SET_CONN', conn);
    },

    changeStatus : function({ dispatch }, status){
        dispatch('CHANGE_STATUS', status);
    },

    addMessage : function({ dispatch }, message){
        
        dispatch('ADD_MESSAGE',message);
    },


};