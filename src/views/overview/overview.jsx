import React from 'react';
import "./overview.less"
import ScollTable from './scollTable'
import ReactEcharts from "echarts-for-react";
import moment from 'moment'
let AMap = window.AMap;
class Overview extends React.Component {
    state = {
        info: {},  //很多数据..
        todayInfo: {},  //当日的数据
        rankList: [
            {cname:'xxxxx学校',count:222},
            {cname:'yyyyy学校',count:200},
            {cname:'zzzzz学校',count:188},
            {cname:'aaaaa学校',count:150},
        ],  //学校预警排名
        echartsOptions: {},
        statistics:{}
    };
    map = {};
    componentDidMount = () => {

        this.setMap();
        this.setEchartsOption();
        this.statistics();
    }
    // 设置地图
    setMap = () => {
        this.map = new AMap.Map("Map", {
            zoom: 14, //级别
            pitch: 55,
            skyColor: "#1c81ff",
            center: [108.872164, 34.207714], //中心点坐标
            mapStyle: "amap://styles/grey", //设置地图的显示样式
            viewMode: "3D", //使用3D视图
        });
    };
    // 月度抽查完成率echarts配置
    setEchartsOption = () => {
        let echartsOptions = this.state.echartsOptions;
        // 最外圈的点点
        function _pie3() {
            let dataArr = [];
            for (let i = 0; i < 120; i++) {
                if (i % 2 === 0) {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 1,
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                                shadowBlur: 30,
                                borderColor: '#3699FF',
                                shadowColor: 'rgba(142, 152, 241, 0.6)'
                            }
                        }
                    })
                } else {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 5,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    })
                }

            }
            return dataArr
        }
        echartsOptions = {
            tooltip: {
                show: false
            },
            legend: {
                show: false
            },
            toolbox: {
                show: false
            },
            series: [
                {
                    name: '未完成',
                    type: 'pie',
                    radius: ['40%', "55%"],
                    hoverAnimation: false,
                    clockwise: false,
                    tooltip: {
                        show: false
                    },
                    center: ['50%', '50%'],
                    data: [{
                        tooltip: {
                            show: true
                        },
                        value: 20,
                        itemStyle: {
                            color: "#3699FF"
                        },
                        label: {
                            color: "#fff",
                            fontSize: 14,
                            padding: 10,
                            formatter: [
                                '{a|未完成占总比}',
                                '{b|{d}%}',
                            ].join('\n'),
                            rich: {
                                a: {
                                    color: "#fff",
                                    fontSize: 14,
                                    lineHeight: 16
                                },
                                b: {
                                    color: "#3699FF",
                                    fontSize: 14,
                                    lineHeight: 24,
                                    padding: 30,
                                }
                            }
                        }
                    },
                    {
                        value: 80,
                        name: 'rose2',
                        itemStyle: {
                            color: "transparent"
                        }
                    }
                    ]
                },
                {
                    name: '已完成',
                    type: 'pie',
                    radius: ['44%', "51%"],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    clockwise: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 20,
                        itemStyle: {
                            color: "transparent"
                        }
                    },
                    {
                        value: 80,
                        name: '',
                        tooltip: {
                            show: true
                        },
                        itemStyle: {
                            color: "#ED5B2A"
                        },
                        label: {
                            color: "#fff",
                            fontSize: 14,
                            padding: 10,
                            formatter: [
                                '{a|完成占总比}',
                                '{b|{d}%}',
                            ].join('\n'),
                            rich: {
                                a: {
                                    color: "#fff",
                                    fontSize: 14,
                                    lineHeight: 16
                                },
                                b: {
                                    color: "#ED5B2A",
                                    fontSize: 14,
                                    lineHeight: 24,
                                    padding: 20,
                                }
                            }
                        }
                    }
                    ]
                },

                {
                    type: 'pie',
                    zlevel: 3,
                    silent: true,
                    radius: ['69%', '70%'],
                    label: {
                        normal: {
                            show: false
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: _pie3()
                }
            ]
        }
        this.setState({
            echartsOptions
        })
    }
    statistics = () => {
        let statistics = {
            legend: {
                data: ["XX数", "YY数", "ZZ数"],
                orient: "horizontal",
                textStyle:{
                    color:'#fff'
                },
                top: 0,
                right: 0,
                icon: "path://M597.333333 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-914.2784A402.2784 402.2784 0 1 0 999.611733 512 402.2784 402.2784 0 0 0 597.333333 109.7216zM597.333333 768a256 256 0 1 1 256-256 256 256 0 0 1-256 256z m0-402.2784A146.2784 146.2784 0 1 0 743.611733 512 146.2784 146.2784 0 0 0 597.333333 365.7216z"
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 16
                }
            },
            xAxis: {
                type: 'category',
                axisLabel:{
                    color:'#fff'
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                },
                data: [
                    moment().format('YYYY-MM-DD'),
                    moment().subtract(1, 'days').format('YYYY-MM-DD'),
                    moment().subtract(2, 'days').format('YYYY-MM-DD'),
                    moment().subtract(3, 'days').format('YYYY-MM-DD'),
                    moment().subtract(4, 'days').format('YYYY-MM-DD'),
                    moment().subtract(5, 'days').format('YYYY-MM-DD'),
                    moment().subtract(6, 'days').format('YYYY-MM-DD'),
                ]
            },
            color: ["rgba(224,30,90,1)", "rgba(239,162,5,1)", "rgba(8,176,136,1)", "rgba(56,80,213,1)"],
            yAxis: {
                type: 'value',
                axisLabel:{
                    color:'#fff'
                },
            },
            series: [{
                name: "XX数",
                data: [67,89,18,78,12,32,12],
                type: 'line',
                smooth: true
            }, {
                name: "YY数",
                data: [73,32,43,76,23,64,87],
                type: 'line',
                smooth: true
            }, {
                name: "ZZ数",
                data: [32,45,87,90,78,43,12],
                type: 'line',
                smooth: true
            }]
        };
        this.setState({ statistics })
    }
    render() {
        return (
            <div className='overviewWrap'>
                <div id="Map" className="Map" />
                <div className='headerWrap'>
                    <div />
                    <div className='systemTitle'>XXXXXXXXXX系统</div>
                    <div className='header-right'>
                        <div className='enter' onClick={() => { this.props.history.push('/main/grid') }}>进入系统</div>
                        <div className='logout' onClick={() => { this.props.history.push('/') }}>退出</div>
                    </div>
                </div>
                <div className='leftWrap'>
                    <div className='total'>
                        <div className='numberItem'><div className='title'>累计XX总数</div><div className='number'>{this.state.info.all ? this.state.info.all : 0}</div></div>
                        <div className='numberItem'><div className='title'>XXXX总数</div><div className='number'>{this.state.info.AIall ? this.state.info.AIall : 0}</div></div>
                        <div className='numberItem'><div className='title'>XXXX总数</div><div className='number'>{this.state.info.handleall ? this.state.info.handleall : 0}</div></div>
                    </div>
                    <div className='chart'>
                        <div className='title-line'>环形图</div>
                        <ReactEcharts
                            option={this.state.echartsOptions}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className='chart'>
                        <div className='title-line'>折线图</div>
                        <ReactEcharts
                            option={this.state.statistics}
                            style={{ width: '380px', height: '100%' }}
                        />
                    </div>
                </div>
                <div className='rightWrap'>
                    <div className='dataTable'>
                        <div className='title-line'>滚动数据</div>
                        <ScollTable />
                    </div>
                    <div className='ranking'>
                        <div className='title-line'>表格排名（本月）</div>
                        <table className='rank-table'>
                            <thead>
                                <tr>
                                    <th>排名</th>
                                    <th>企业名称</th>
                                    <th>预警数</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rankList.map((item, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <div className='rank-index'>{index + 1}</div>
                                        </td>
                                        <td>{item.cname}</td>
                                        <td>{item.count}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview;