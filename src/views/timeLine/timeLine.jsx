import React from 'react'
import { Timeline,Modal } from 'antd';
import "./timeLine.less"
import Image from "../../assets/images/img.png"
import PassIcon from "../../assets/images/icon_pass.png"
import CloseIcon from "../../assets/images/icon_close.png"
import BigImage from '../../assets/images/bigImg.png'
export default class TimeLine extends React.Component {
    state = {
        showDetailModal: false,
        detail: {},  //弹窗里显示的信息
        timeItem: [
            {
                time: '2020-05-29 15:04:05',
                content: 'xxx学校 设备1 预警',
                img: Image,
                status: 1,
            },
            {
                time: '2020-05-29 14:04:05',
                content: 'xxx学校 设备1 通过',
                img: Image,
                status: 0,
            },
            {
                time: '2020-05-29 13:04:05',
                content: 'xxx学校 设备1 预警',
                img: Image,
                status: 1,
            },
            {
                time: '2020-05-29 12:04:05',
                content: 'xxx学校 设备1 通过',
                img: Image,
                status: 0,
            },
            {
                time: '2020-05-29 11:04:05',
                content: 'xxx学校 设备1 通过',
                img: Image,
                status: 0,
            },
        ]
    }
    // 详情弹窗显示
    showModal = (item) =>{
        let detail = {
            mask:true,
            hat:true,
            glove:true,
            cigarette:true,
            phone:true,
            separate:true,
            animal:true,
            hygiene:true,
            cname:"xxxxxxx",
            linkaddress:'陕西省西安市xxxxxx',
            linkmen:'测试人员',
            linktel:'13111111111',
            AItime:'2020-05-27 15:17:15'
        }
        this.setState({
            detail,
            showDetailModal: true
        })
    }
    // 详情弹窗关闭
    handleModalCancel = () => {
        this.setState({
            showDetailModal: false,
            detail: {},
            AIinfo: [],
            xScale: 0,
            yScale: 0,
        })
    }
    render() {
        return (
            <div className='timelineWrap'>
                <Timeline mode='left' className='myTimeLine'>
                    {this.state.timeItem.map(item => {
                        return <Timeline.Item key={item.time} label={item.time} color={item.status == 1 ? 'red' : 'green'}>
                            <div className='timeLineContent' onClick={()=>{this.showModal(item)}}>
                                <p className='contentText'>{item.content}</p>
                                <div className='contentImage'><img src={item.img} style={{width:'100%',height:"100%",marginTop:"10px"}} alt=""/></div>
                            </div>
                        </Timeline.Item>
                    })}
                </Timeline>
                <Modal
                    title=""
                    visible={this.state.showDetailModal}
                    onCancel={this.handleModalCancel}
                    footer={null}
                    className='warningDetailModal'
                    destroyOnClose
                >
                    <div className='detailWrap'>
                        <div className='detailImage'>
                            <canvas width="635px" height="432px"
                                id="AICanvas"
                                style={{
                                    backgroundImage: "url("+BigImage+") ",
                                    backgroundSize: "100% 100%",
                                    backgroundRepeat: "no-repeat"
                                }}
                            />
                        </div>
                        <div className='itemWrap'>
                            <div className='detailItem'>
                                <div className='title'>戴口罩</div>
                                <div className='result'>
                                    {this.state.detail.mask ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>通过</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem'>
                                <div className='title'>戴帽子</div>
                                <div className='result'>
                                    {this.state.detail.hat ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>通过</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem'>
                                <div className='title'>戴手套</div>
                                <div className='result'>
                                    {this.state.detail.glove ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>通过</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem'>
                                <div className='title'>香烟</div>
                                <div className='result'>
                                    {this.state.detail.cigarette ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>未发现</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem'>
                                <div className='title'>手机</div>
                                <div className='result'>
                                    {this.state.detail.phone ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>未发现</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem'>
                                <div className='title'>卫生情况</div>
                                <div className='result'>
                                    {this.state.detail.hygiene ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>良好</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem'>
                                <div className='title'>生熟分开</div>
                                <div className='result'>
                                    {this.state.detail.separate ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>通过</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='detailItem detailItemLast'>
                                <div className='title'>小动物</div>
                                <div className='result'>
                                    {this.state.detail.animal ?
                                        <div className='statusWrap'><div className='icon'><img src={PassIcon} alt="passIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textPass'>未发现</div></div> :
                                        <div className='statusWrap'><div className='icon'><img src={CloseIcon} alt="warningIcon" style={{ width: '100%', height: "100%" }}></img></div><div className='textWarning'>未通过</div></div>
                                    }
                                </div>
                            </div>
                            <div className='infoItem'>
                                <div className='title'>企业</div>
                                <div className='result' title={this.state.detail.cname}>{this.state.detail.cname}</div>
                            </div>
                            <div className='infoItem'>
                                <div className='title'>地址</div>
                                <div className='result' title={this.state.detail.linkaddress}>{this.state.detail.linkaddress}</div>
                            </div>
                            <div className='infoItem'>
                                <div className='title'>负责人</div>
                                <div className='result' title={this.state.detail.linkmen}>{this.state.detail.linkmen}</div>
                            </div>
                            <div className='infoItem'>
                                <div className='title'>联系方式</div>
                                <div className='result' title={this.state.detail.linktel}>{this.state.detail.linktel}</div>
                            </div>
                            <div className='infoItem infoItemLast'>
                                <div className='title'>时间</div>
                                <div className='result' title={this.state.detail.AItime}>{this.state.detail.AItime}</div>
                            </div>
                        </div>
                    </div>

                </Modal>
            </div>

        )
    }
}