import Vue from 'vue'
import App from './App.vue'
import Auth from './Auth.vue'

Vue.config.debug = true;

new Vue({
    el: 'body',
    components: { App, Auth },
    data : {
        currentView : 'App'
    }
});

