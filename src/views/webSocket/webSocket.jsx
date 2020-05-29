import React from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
export default class WebSocket extends React.Component {
    componentDidMount = () => {

    }
    // 原生webSocket
    webSocketTest = () => {
        // 打开一个 web socket
        let ws = new WebSocket("ws://localhost:9998/echo");
        // 使用 send() 方法发送数据
        ws.onopen = () => {
            ws.send("发送数据");
            console.log("数据发送中...");
        };
        // 接收数据
        ws.onmessage = (evt) => {
            let received_msg = evt.data;
            console.log("数据已接收...");
        };
        // 关闭websocket
        ws.onclose = () => {
            console.log("连接已关闭...");
        };
    }
    // 使用SockJS和Stomp插件的webSocket
    createWebsocket = () => {
        // 打开一个 web socket
        let socket = new SockJS(`http://localhost:9998/recognition/webSocket`);
        let stompClient = Stomp.over(socket);
        // 发送数据 第二个参数为headers 第三个参数为body
        stompClient.send("/topic/getHomePageDataListAll", {}, "")
        // 接收数据
        stompClient.subscribe("/topic/getHomePageDataListAll", (data) => {
            let received_msg = data.body;
            console.log("数据已接收...");
        })
        // 关闭websocket
        stompClient.disconnect(() => {
            console.log("连接已关闭...");
        })
    }
    render() {
        return (
            <div>webSocket通讯模块</div>
        )
    }
}