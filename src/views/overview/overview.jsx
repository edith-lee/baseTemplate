import React from 'react';
import "./overview.less"
import ScollTable from './scollTable'
import ReactEcharts from "echarts-for-react";
let AMap = window.AMap;
class Overview extends React.Component {
    state = {
        info: {},  //很多数据..
        todayInfo: {},  //当日的数据
        rankList: [],  //学校预警排名
        echartsOptions: {}
    };
    map = {};
    componentDidMount = () => {
       
            this.setMap();
            this.setEchartsOption();
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
    render() {
        return (
            <div className='overviewWrap'>
                <div id="Map" className="Map" />
                <div className='headerWrap'>
                    <div />
                    <div className='systemTitle'>明厨亮灶AI分析系统</div>
                    <div className='header-right'>
                        <div className='enter' onClick={() => { this.props.history.push('/main/home') }}>进入系统</div>
                        <div className='logout' onClick={() => { this.props.history.push('/') }}>退出</div>
                    </div>
                </div>
                <div className='leftWrap'>
                    <div className='info1'>
                        <div className='numberItem'><div className='title'>企业总数</div><div className='number'>{this.state.info.company}</div></div>
                        <div className='numberItem'><div className='title'>设备总数</div><div className='number'>{this.state.info.camera}</div></div>
                        <div className='numberItem'><div className='title'>设备在线</div><div className='number'>{this.state.info.online}</div></div>
                        <div className='numberItem'><div className='title'>离线设备</div><div className='number offline'>{this.state.info.offline}</div></div>
                    </div>
                    <div className='total'>
                        <div className='numberItem'><div className='title'>累计抽查总数</div><div className='number'>{this.state.info.all ? this.state.info.all : 0}</div></div>
                        <div className='numberItem'><div className='title'>累计AI预警总数</div><div className='number'>{this.state.info.AIall ? this.state.info.AIall : 0}</div></div>
                        <div className='numberItem'><div className='title'>累计预警审核总数</div><div className='number'>{this.state.info.handleall ? this.state.info.handleall : 0}</div></div>
                    </div>
                    <div className='today'>
                        <div className='numberItem'><div className='title'>当日实时AI预警数量</div><div className='number'>{this.state.todayInfo.AIall}</div></div>
                        <div className='numberItem'><div className='title'>当日实时审核预警数</div><div className='number'>{this.state.todayInfo.handleall}</div></div>
                    </div>
                    <div className='chart'>
                        <div className='title-line'>月度抽查完成率</div>
                        <ReactEcharts
                            option={this.state.echartsOptions}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
                <div className='rightWrap'>
                    <div className='dataTable'>
                        <div className='title-line'>审核预警数据</div>
                        <ScollTable />
                    </div>
                    <div className='ranking'>
                        <div className='title-line'>学校预警排名（本月）</div>
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