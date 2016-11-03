<template>
    <div id="app">
        <div class="slide-bar">
          <user></user>
          <list></list>
        </div>
        <div class="main">
          <message></message>
          <user-text></user-text>
        </div>
    </div>
</template>

<script>
    import store from './vuex/store';
    import actions from './vuex/actions'
    import getters from './vuex/getters'

    import User from './components/User.vue';
    import List from './components/List.vue';
    import Message from './components/Message.vue';
    import UserText from './components/Text.vue';

    export default {
        vuex : {
          actions : actions,
          getters : getters
        },

        components:{
          User,UserText,Message,List
        },

        created : function(){
          let conn = new WebSocket('ws://127.0.0.1:9501');
          this.setConn(conn);
          console.log(this.getConn);
        },

        store: store
    }
</script>

<style lang="less">
    #app{
        width: 800px;
        height: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -400px;
        margin-top: -300px;

        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        border-radius: 3px;
        
        .slide-bar,.main{
          height:100%;
        }

        .slide-bar{
          width: 200px;
          background:#2e3238;
          color: #f4f4f4;
        }
        .main{
          width: 600px;
          background: #eee;
          display: flex;
          flex-direction: column;
        }

    }
</style>