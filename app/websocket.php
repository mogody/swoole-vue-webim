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
            id : 0
        }
    }

    MESSAGE
    {
        status : 200,
        type : 'message',
        data : {
            from : 0,
            to : 0,
            msg : ''
        }
    }

    INIT
    {
        status : 200,
        type : 'init',
        data : {
            
        }
    }


*
*/
class WebSocket{
    const CONNECT_TYPE = 'connect';
    const DISCONNECT_TYPE = 'disconnect';
    const MESSAGE_TYPE = 'message';
    const INIT_SELF_TYPE = 'self_init';
    const INIT_OTHER_TYPE = 'other_init';

    private $avatars = [
        'http://e.hiphotos.baidu.com/image/h%3D200/sign=08f4485d56df8db1a32e7b643922dddb/1ad5ad6eddc451dad55f452ebefd5266d116324d.jpg',
        'http://tva3.sinaimg.cn/crop.0.0.746.746.50/a157f83bjw8f5rr5twb5aj20kq0kqmy4.jpg',
        'http://www.ld12.com/upimg358/allimg/c150627/14353W345a130-Q2B.jpg',
        'http://www.qq1234.org/uploads/allimg/150121/3_150121144650_12.jpg',
        'http://tva1.sinaimg.cn/crop.4.4.201.201.50/9cae7fd3jw8f73p4sxfnnj205q05qweq.jpg',
        'http://tva1.sinaimg.cn/crop.0.0.749.749.50/ac593e95jw8f90ixlhjdtj20ku0kt0te.jpg',
        'http://tva4.sinaimg.cn/crop.0.0.674.674.50/66f802f9jw8ehttivp5uwj20iq0iqdh3.jpg',
        'http://tva4.sinaimg.cn/crop.0.0.1242.1242.50/6687272ejw8f90yx5n1wxj20yi0yigqp.jpg',
        'http://tva2.sinaimg.cn/crop.0.0.996.996.50/6c351711jw8f75bqc32hsj20ro0roac4.jpg',
        'http://tva2.sinaimg.cn/crop.0.0.180.180.50/6aba55c9jw1e8qgp5bmzyj2050050aa8.jpg'
    ];

    private $nicknames = [
        '沉淀', '暖寄归人', '厌世症i', '难免心酸°', '過客。', '昔日餘光。', '独特', '有爱就有恨' ,'共度余生','忆七年','单人旅行','何日许我红装','醉落夕风'
    ];

    private $server;
    private $port;

    public function __construct($port){
        $this->port = $port;
        $this->init();
    }

    public function init(){
        $this->table = new swoole_table(1024);
        $this->table->column('id', swoole_table::TYPE_INT, 4);       //1,2,4,8
        $this->table->column('avatar', swoole_table::TYPE_STRING, 1024);
        $this->table->column('nickname', swoole_table::TYPE_STRING, 64);
        $this->table->create();

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

        $avatar = $this->avatars[array_rand($this->avatars)];
        $nickname = $this->nicknames[array_rand($this->nicknames)];

        $this->table->set($req->fd,[
                'id' => $req->fd,
                'avatar' => $avatar,
                'nickname' => $nickname
            ]);

        //init selfs data
        $userMsg = $this->buildMsg([
                'id' => $req->fd,
                'avatar' => $avatar,
                'nickname' => $nickname
            ],self::INIT_SELF_TYPE);
        $this->server->task([
                'to' => [$req->fd],
                'except' => [],
                'data' => $userMsg
            ]);

        //init others data
        $others = [];
        foreach ($this->table as $row) {
            $others[] = $row;
        }
        $otherMsg = $this->buildMsg($others,self::INIT_OTHER_TYPE);
        $this->server->task([
                'to' => [$req->fd],
                'except' => [],
                'data' => $otherMsg
            ]);

        //broadcast a user is online
        $msg = $this->buildMsg([
                'id' => $req->fd,
                'avatar' => $avatar,
                'nickname' => $nickname
            ],self::CONNECT_TYPE);
        $this->server->task([
                'to' => [],
                'except' => [$req->fd],
                'data' => $msg
            ]);
    }

    public function message(swoole_websocket_server $server, swoole_websocket_frame $frame){
        $receive = json_decode($frame->data,true);
        $msg = $this->buildMsg($receive,self::MESSAGE_TYPE);

        $task = [
            'to' => [],
            'except' => [$frame->fd],
            'data' => $msg
        ];

        if ($receive['to'] != 0) {
            $task['to'] = [$receive['to']];
        }

        $server->task($task);
    }

    public function close(swoole_websocket_server $server, $fd){
        $msg = $this->buildMsg([
                'id' => $fd
            ],self::DISCONNECT_TYPE);
        $this->server->task([
                'to' => [],
                'except' => [$fd],
                'data' => $msg
            ]);
        $this->table->del($fd);
    }

    public function task($server, $task_id, $from_id, $data){
        $clients = $server->connections;
        if (count($data['to']) > 0) {
            $clients = $data['to'];
        }
        foreach ($clients as $fd) {
            if (!in_array($fd, $data['except'])) {
                $this->server->push($fd,$data['data']);
            }
        }
    }

    public function finish(){

    }

    private function buildMsg($data,$type,$status = 200){
        return json_encode([
                'status' => $status,
                'type' => $type,
                'data' => $data
            ]);
    }
}

new WebSocket(9501);