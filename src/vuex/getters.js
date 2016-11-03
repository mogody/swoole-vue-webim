// export function getMsg(state){
//     return state.msg;
// }
export default {
    filterUser : ({ filterUser }) => filterUser,

    currentUser : ({ currentUser }) => currentUser,  //current user

    users : ({ users }) => users,    //user list

    currentSession : ({ currentSession }) => currentSession,

    broadcast : ({ broadcast }) => broadcast,

    getConn : ({ connection }) => {
        
        if (connection != null) {
            return connection;
        }
    }
}