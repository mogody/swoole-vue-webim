<template>
    <div class="content">
        <div class="title">
            <p>{{ currentSession.nickname }}</p>
        </div>
        <div class="message">
            <ul>
                <li v-for="msg in broadcast" tyack-by="id">
                    <p>{{ msg.time }}</p>
                    <div class="msg" v-bind:class="msg.user.id == currentUser.id ? 'self' : ''">
                        <img v-bind:src="msg.user.avatar" v-bind:alt="msg.user.nickname">
                        <div class="text">{{ msg.msg }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import  getters  from '../vuex/getters';

    export default {
        vuex: {
            getters: getters
        }
    }
</script>

<style lang="less">
    .content{
        display: flex;
        flex-direction: column;

        .title{
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #d6d6d6;

            p{
                text-align: center;
                font-size: 16px;
                color: #666;
            }
        }

        .message{
            overflow-y: scroll;
            padding: 10px 15px;
            height: 400px;
            &::-webkit-scrollbar-button{
                display: none;
            }
            &::-webkit-scrollbar{  
                width: 8px;  
                background-color: #eee;  
            }  
              
            /*定义滚动条轨道 内阴影+圆角*/  
            &::-webkit-scrollbar-track{   
                background-color: #eee;  
            }  
              
            /*定义滑块 内阴影+圆角*/  
            &::-webkit-scrollbar-thumb{  
                border-radius: 10px;  
                background: #ccc;
            }  

            li{
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;

                p{
                    align-self: center;
                    padding: 0 18px;
                    font-size: 12px;
                    color: #fff;
                    border-radius: 2px;
                    background-color: #dcdcdc;
                    margin: 5px 0px;
                }

                .msg{
                    display: flex;
                    flex-direction: row;


                    img{
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                        flex-shrink: 0;
                    }
                    .text{
                        padding: 10px;
                        min-height: 30px;
                        font-size: 14px;
                        text-align: left;
                        word-break: break-all;
                        background: #fafafa;
                        border-radius: 4px;
                        line-height: 1.4;
                    }
                }
                .self{
                    flex-direction: row-reverse;
                    .text{
                        background: #b2e281;
                    }
                    img{
                        margin-right: 0px; margin-left: 10px;
                    }
                }
            }
        }
    }


</style>