<template>
    <div id="app">
        <div class="login-box">
            <div class="qrcode">
                <img class="img" src="http://pic.baike.soso.com/p/20131211/20131211091752-393669037.jpg">
                <p class="sub-title">请用微信扫描二维码</p>
            </div>
            <div class="msg" ng-class="{show: isScan}">
                <h4 class="sub-title">扫描成功</h4>
                <button v-on:click="enter">enter</button>
            </div>
        </div>
    </div>
</template>

<script>
    import store from './vuex/store'
    import getters from './vuex/getters'
    import actions from './vuex/actions'

    export default {
        vuex : {
            getters : getters,
            actions : actions
        },
        methods : {
            enter(e){
                let id = 20;
                let avatar = 'http://tva2.sinaimg.cn/crop.0.0.1022.1022.50/005Fj2RDgw1ex5pinpg65j30sg0sgdg9.jpg';
                let nickname = 'WeChat';
                this.setUser({ id, avatar, nickname });
                this.$root.currentView = 'App';
            }
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
        
        .login-box{             position: absolute;             top: 50%;
left: 50%;             margin-left: -190px;             margin-top: -270px;
border-radius: 4px;             -moz-border-radius: 4px;             -webkit-
border-radius: 4px;             background-color: #fff;             width:
380px;             height: 480px;             box-shadow: #999 0 2px 10px;
-moz-box-shadow: #999 0 2px 10px;             -webkit-box-shadow: #999 0 2px
10px;

            .qrcode{
                  text-align: center;

                  img{
                      display: block;
                      width: 276px;
                      height: 276px;
                      margin: 42px auto 5px;
                  }

                  .sub-title{
                      text-align: center;
                      font-size: 18px;
                      color: #353535;
                  }
            }
            .msg{
                text-align: center;
                margin-top: 10px;
                .sub-title{
                    font-size: 22px;
                    padding: 10px;
                    color: #fff;
                    background: #46b855;
                    display: inline;
                    border-radius: 3px;
                }
            }
        }

    }
</style>