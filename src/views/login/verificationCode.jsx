import React from 'react';
export default class VerficationCode extends React.Component {
    componentDidMount = () => {
        this.renderCode(this.props.code)
    }
    componentWillReceiveProps = props => {
        this.renderCode(props.code)
    }
    renderCode = (code) => {
        let codes = code.split("")
        let canvas = document.getElementById('codeCanvas');
        let ctx = canvas.getContext('2d');
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.randomColor(180, 240);
        ctx.fillRect(0, 0, 140, 60);
        // 写字
        for (let i = 1; i <= 4; i++) {
            ctx.font = this.randomNum(30, 60) + 'px SimHei'; //随机生成字体大小
            ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
            ctx.shadowOffsetX = this.randomNum(-3, 3);
            ctx.shadowOffsetY = this.randomNum(-3, 3);
            ctx.shadowBlur = this.randomNum(-3, 3);
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            let x = 25 * i;
            let y = 30;
            let deg = this.randomNum(-30, 30);
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(codes[i-1], 0, 0);
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        // 干扰线
        for(let i = 0; i < 4; i++) {
            ctx.strokeStyle = this.randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(this.randomNum(0, 140), this.randomNum(0, 60));
            ctx.lineTo(this.randomNum(0, 140), this.randomNum(0, 60));
            ctx.stroke();
        }
        // 干扰点
        for(let i = 0; i < 25; i++) {
            ctx.fillStyle = this.randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(this.randomNum(0, 140), this.randomNum(0, 60), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    // 随机颜色
    randomColor = (min, max) => {
        let r = this.randomNum(min, max);
        let g = this.randomNum(min, max);
        let b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    // 随机数字
    randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    render() {
        return (
            <canvas className='code' width="140px" height="60px" id="codeCanvas"
                style={{
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat"
                }} />
        )
    }
}