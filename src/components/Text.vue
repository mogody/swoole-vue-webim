<template>
    <div class="user-text">
        <textarea name="" id="" placeholder="Press enter to send" v-model="content"></textarea>
    </div>
    <div class="text-footer">
        <span>按下Ctrl+Enter换行</span>
        <button v-on:click="send">发送</button>
    </div>
</template>


<script>

    import actions from '../vuex/actions'
    import getters from '../vuex/getters'

    export default {
        vuex: {
            getters : getters,
            actions : actions
        },

        methods : {
            send(e){
                let date = new Date();
                let _this = this;
                let msg = {
                        from : _this.currentUser.id,
                        to : _this.currentSession.id,
                        msg : _this.content,
                        date : date
                    };
                if (this.content != '') {
                    this.conn.send(JSON.stringify(msg));
                    _this.content = '';
                }
                msg.is_self = 1;
                _this.addMessage(msg);
            }
        },

        data () {
            return{
                content : ''
            }
        }
        
    }
</script>


<style lang="less">
    .user-text{
        height: 120px;
        border-top: 1px solid #ddd;

        textarea{
            padding: 10px;
            resize: none;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
        }
    }
    .text-footer{
        display: flex;
        padding: 10px 20px;
        background: #fff;
        justify-content: flex-end;
        align-items: flex-end;
        button{
            background: #fff;
            padding: 3px 20px;
            color: #222;
            border: 1px solid #c1c1c1;
            border-radius: 3px;
        }
        span{
            font-size: 14px;
            color: #999;
            margin-right: 10px;
        }
    }
</style>