import React from 'react';
import "./gridPage.less"
import { Breadcrumb, Modal, Empty } from 'antd';
import SearchForm from "../../components/myForm/searchForm"
import MyPagination from "../../components/myPagination/myPagination"
import PassIcon from "../../assets/images/icon_pass.png"
import TimeIcon from "../../assets/images/icon_time.png"
import CloseIcon from "../../assets/images/icon_close.png"
import LocationIcon from "../../assets/images/icon_location.png"
import CameraIcon from "../../assets/images/icon_camera.png"
import Image from '../../assets/images/img.png'
import BigImage from '../../assets/images/bigImg.png'
class GridPage extends React.Component {
    state = {
        pagination: {
            total: 70,
            pageSize: 12,
            current: 1
        },
        search: {}, //搜索条件
        showDetailModal: false,
        warningList: [],
        detail: {},  //弹窗里显示的信息
        AIinfo: [],   // canvas上要画的框框
        xScale: 0, // x的比例
        yScale: 0, // y的比例
    }
    renderSearchFormList = () => {
        let searchFormList = [
            {
                type: 'INPUT',
                label: "企业名称",
                id: 'cname',
                placeholder: '请输入企业名称',
                width: 200,
            },
            {
                type: 'DATES',
                label: '时间',
                id: 'searchTime',
                width: 360,
                showTime: true
            },
            {
                type: 'SELECT',
                label: '状态',
                id: 'AIstatus',
                placeholder: '请选择状态',
                initialValue: 'all',
                width: 117,
                list: [{ name: '全部', value: 'all' }, { name: '通过', value: '1' }, { name: '预警', value: '2' }]
            },
            {
                type: 'SELECT',
                label: '类型',
                id: 'AIobject',
                placeholder: '请选择类型',
                initialValue: 'all',
                width: 117,
                list: [{ name: '全部', value: 'all' }, { name: '未戴口罩', value: '未戴口罩' }, { name: '未戴帽子', value: '未戴帽子' }]
            },
        ]
        return searchFormList
    }

    componentDidMount = () => {
        this.getList()
    }
    getList = () => {
        let warningList = [
            {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            },
            {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 2
            },
            {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 2
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 2
            }, {
                cname: '测试',
                name: '测试',
                AItime: '2020-05-27 15:07:20',
                AIstatus: 1
            }
        ]
        this.setState({
            warningList
        })
    }
    handleSearch = values => {
        let search = {}
        search.cname = values.cname;
        if (values.searchTime && values.searchTime.length == 2) {
            search.bdate = values.searchTime[0].format('YYYY-MM-DD HH:mm:ss');
            search.edate = values.searchTime[1].format('YYYY-MM-DD HH:mm:ss')
        }
        if (values.AIstatus != 'all') {
            search.AIstatus = values.AIstatus
        }
        if (values.AIobject != 'all') {
            search.AIobject = values.AIobject
        }
        let pagination = this.state.pagination
        pagination.current = 1
        this.setState({
            search,
            pagination
        }, () => {
            this.getList()
        })
    }
    paginationChange = pagination => {
        this.setState({
            pagination
        }, () => {
            this.getList()
        })
    }
    showDetailModal = item => {
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
    handleModalCancel = () => {
        this.setState({
            showDetailModal: false,
            detail: {},
            AIinfo: [],
            xScale: 0,
            yScale: 0,
        })
    }
    draw = () => {
        let ele = document.getElementById("AICanvas");
        let ctx = ele.getContext("2d");
        ctx.clearRect(0, 0, 635, 432); //清除画布
        let AIinfo = this.state.AIinfo;
        if (AIinfo) {
            AIinfo.map(item => {
                let X = parseFloat(parseInt(item.left) / this.state.xScale).toFixed(2);
                let Y = parseFloat(parseInt(item.top) / this.state.yScale).toFixed(2);
                let W = parseFloat(parseInt(item.width) / this.state.xScale).toFixed(2);
                let H = parseFloat(parseInt(item.height) / this.state.yScale).toFixed(2);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#F52323';
                ctx.rect(X, Y, W, H);
                ctx.stroke();
            })
        }
    }
    render() {
        return (
            <div className='warningWrap'>
                <Breadcrumb>
                    <Breadcrumb.Item>AI预警</Breadcrumb.Item>
                </Breadcrumb>
                <div className='mySearchFormWrap'>
                    <SearchForm formList={this.renderSearchFormList()} buttonText='搜索' handleSearch={this.handleSearch} />
                    {/* <Button>批量导出</Button> */}
                </div>
                <div className='listWrap'>
                    <div className='flexWrap'>
                        {this.state.warningList.length > 0 ? this.state.warningList.map(item => {
                            return <div className={item.AIstatus == '1' ? 'warningItem' : "warningItem warningItem_nopass"} onClick={() => { this.showDetailModal(item) }} key={item.code}>
                                <div className='imgWrap'>
                                    <img src={Image} style={{ width: '100%', height: "100%" }} alt='AI预警'></img>
                                </div>
                                <div className='timeWrap' title={item.cname} style={{ marginTop: 5 }}>
                                    <div className='icon_location'><img src={LocationIcon} alt="timeIcon" style={{ width: '100%', height: "100%" }}></img></div>
                                    <div className='text_location'>{item.cname}</div>
                                </div>
                                <div className='timeWrap' title={item.name}>
                                    <div className='icon_camera'><img src={CameraIcon} alt="timeIcon" style={{ width: '100%', height: "100%" }}></img></div>
                                    <div className='text_camera'>{item.name}</div>
                                </div>
                                <div className='timeWrap'>

                                    <div className='icon'><img src={TimeIcon} alt="timeIcon" style={{ width: '100%', height: "100%" }}></img></div>
                                    <div className='text'>{item.AItime}</div>
                                </div>
                                {item.AIstatus == '1' ? <div className='pass'><span className='xuanzhuan'>通过</span></div> : <div className='noPass'><span className='xuanzhuan'>预警</span></div>}
                            </div>
                        }) :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ textAlign: 'center', width: '100%' }} />
                        }
                    </div>
                    <MyPagination pagination={this.state.pagination} handlePaginationChange={this.paginationChange} pageSizeOptions={[12, 18, 24, 30]} />
                </div>
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

export default GridPage;