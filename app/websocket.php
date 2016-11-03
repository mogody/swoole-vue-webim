<?php
/**
*   the format of json
*   
*   CONNECT
*   {
        status : 200,
        type : 'connect',
        data : {
            id : 0,
            avatar : '',
            nickname : ''
        }
    }

    DISCONNECT
    {
        status : 200,
        type : 'disconnect',
        data : {
            id : 0,
            avatar : '',
            nickname : ''
        }
    }

    MESSAGE
    {
        status : 200,
        type : 'message',
        data {
            from : 0,
            to : 0,
            msg : ''
        }
    }


*
*/
class WebSocket{
    private $server;
    private $port;

    public function __construct($port){
        $this->port = $port;

        $this->init();
    }

    public function init(){
        $this->server = $server = new swoole_websocket_server('0.0.0.0',$this->port);

        $server->set([
            'task_worker_num' => 4
        ]);

        $server->on('open', [ $this,'open' ]);
        $server->on('message', [$this, 'message']);
        $server->on('close', [$this, 'close']);
        $server->on('task', [$this, 'task']);
        $server->on('finish', [$this, 'finish']);

        $server->start();
    }

    public function open(swoole_websocket_server $server, swoole_http_request $req){

    }

    public function message(swoole_websocket_server $server, swoole_websocket_frame $frame){

    }

    public function close(swoole_websocket_server $server, $fd){

    }

    public function task(){

    }

    public function finish(){

    }
}

new WebSocket(9501);