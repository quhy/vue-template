const websocket = {
    install(Vue, options) {
        Vue.prototype.websocket = {};

        //初始化websocket
        Vue.prototype.initWebSocket = function () {
            if (this.websocket.readyState !== 1) {
                if (this.websocket.close) {
                    this.websocket.close();
                }
                this.websocket = new WebSocket('ws://4563.com');
                this.websocket.onopen = this.wsOpen;
                this.websocket.onerror = this.wsError;
                this.websocket.onmessage = this.wsMessage;
                this.websocket.onclose = this.wsClose;
            }
        };

        //重连websocket
        Vue.prototype.reconnectWebSocket = function () {
            setTimeout(() => {
                this.initWebSocket();
            }, 5000);
        };

        Vue.prototype.wsOpen = function () {
            console.debug('连接成功');
            this.$notify.success({
                title: '成功',
                message: 'websocket 连接成功'
            });
        };

        Vue.prototype.wsClose = function () {
            console.debug('连接关闭');
            this.reconnectWebSocket();
        };

        Vue.prototype.wsError = function () {
            console.debug('连接错误');
            this.$notify.error({
                title: '失败',
                message: 'websocket 连接失败'
            });
        };

        Vue.prototype.wsMessage = function (e) {
            //obj为收到的消息对象,{action: '指令', target: 'id', data: '数据'}
            let obj = JSON.parse(e.data);
            console.log(obj);
        };
    }
};

export default websocket;
