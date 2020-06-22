import React from 'react';
import './scollTable.less';
import Image from "../../assets/images/img.png"
export default class EditableTable extends React.Component {
    state = {
        data: [
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'yyyyyyyyyy学校', handletime: '2020-05-27', result: [ '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'yyyyyyyy学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'zzzzzzzzz学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'zzzzzzzzzzzzz学校', handletime: '2020-05-27', result: [ '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '卫生情况差'] },
            { cname: 'yyyyyyyy学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '卫生情况差'] },
            { cname: 'yyyyyyyyyy学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: [ '卫生情况差'] },
            { cname: 'xxxxx学校', handletime: '2020-05-27', result: ['未戴口罩', '未戴手套', '未戴帽子', '卫生情况差'] },
        ]
    }
    componentDidMount = () => {
        //文字无缝滚动
        this.industryNews = setInterval(this.taskIndustryNews, 50);
    }
    taskIndustryNews = () => {
        //console.log(this.refs.newDiv)
        if (this.refs.newDiv.scrollTop >= this.refs.newDivUI.offsetHeight - this.refs.newDiv.clientHeight) {
            this.refs.newDiv.scrollTop = 0;
        }
        else {
            this.refs.newDiv.scrollTop += 1;
        }
    }
    handleIndustryNewsEnter = () => {
        clearInterval(this.industryNews);
    }
    handleIndustryNewsLeave = () => {
        this.industryNews = setInterval(this.taskIndustryNews, 50);
    }
    componentWillUnmount = () => {
        clearInterval(this.industryNews);
    }
    render() {
        return (
            <div className='ceShiTable'>
                <div
                    ref='newDiv'
                    className='ceShiTable-body'
                    onMouseEnter={this.handleIndustryNewsEnter.bind(this)}
                    onMouseLeave={this.handleIndustryNewsLeave.bind(this)}
                >
                    <ul ref='newDivUI'>
                        {this.state.data && this.state.data.length > 0
                            ?
                            this.state.data.map(this.tableBody)
                            : <span className='noData'>暂无数据</span>

                        }
                    </ul>
                </div>
            </div>
        );
    }
    tableBody = (item, index) => {
        return (
            <li key={index}>
                <span className='name' title={item.cname}>
                    <div className='name-div'>
                        {item.cname}
                    </div>
                </span>
                <span className='time'>
                    <div className='time-div'>
                        {item.handletime}
                    </div>
                </span>
                <span className='detail' title={item.result.join(" ")}>
                    <div className='detail-div'>
                        {item.result.join(" ")}
                    </div>
                </span>
                <span className='img'>
                    <img src={Image} alt='' style={{ width: '100%', height: '100%' }} />
                </span>
            </li>
        );
    }


}
