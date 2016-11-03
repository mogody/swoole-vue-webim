<template>
    <div class="card">
        <div class="header">
            <img class="avatar" v-bind:src="currentUser.avatar" v-bind:alt="currentUser.name">
            <p class="name">{{ currentUser.nickname }}</p>
        </div>
        <div class="search">
            <input type="text" placeholder="Search" v-on:keyup="onKeyup | debounce 300">
        </div>
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
        methods: {
            onKeyup (e) {
                this.searchUser(e.target.value);
            }
        }
    }
</script>

<style lang="less">
    .card{
        display: flex;
        flex-direction: column;
        padding: 20px 15px;
        border-bottom: 1px solid #24272c;

        .header{
            display: flex;
            flex-direction: row;

            img{
                width: 40px; 
                height: 40px;
            }

            p{
                font-size: 16px;
                align-self:center;
                margin-left: 15px;
            }
        }

        .search{
            input{
                margin-top: 10px;
                width: 100%;
                background: #26292e;
                border: 1px solid #3a3a3a;
                height: 30px;
                border-radius: 4px;
                color: #fff;
                padding: 10px;
            }
        }
    }
</style>