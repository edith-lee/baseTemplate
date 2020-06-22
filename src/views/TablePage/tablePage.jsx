import React from 'react';
import { Breadcrumb, Button, Space, Modal, Form, Input, Select, message } from 'antd'
import { EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import SearchForm from '../../components/myForm/searchForm'
import MyTable from "../../components/myTable/myTable"
import MyPagination from "../../components/myPagination/myPagination"
const { Option } = Select;
class TablePage extends React.Component {
    formRef = React.createRef();
    add = 1;
    state = {
        pagination: {
            total: 800,
            pageSize: 10,
            current: 1
        },
        search: {}, //搜索参数
        tableData: [],
        showModal: false,  //新增编辑弹窗
        current: '',  //当前操作的数据的code
    }
    searchFormList = [
        {
            type: 'INPUT',
            label: "账号",
            id: 'account',
            placeholder: '请输入账号',
            width: 200,
        },
        {
            type: 'INPUT',
            label: "姓名",
            id: 'realname',
            placeholder: '请输入姓名',
            width: 200,
        },
    ]
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <div className='tableIndex'>{index + 1}</div>,
            width: 80
        },
        {
            title: '账号',
            dataIndex: 'account',
            key: 'account',
            ellipsis: true,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
            render: (text, record) => record.userpower == 0?'管理员':'系统使用者'
        },
        {
            title: '姓名',
            dataIndex: 'realname',
            key: 'realname',
            ellipsis: true,
        },
        {
            title: '邮箱',
            dataIndex: 'emailaddress',
            key: 'emailaddress',
            ellipsis: true,
        },
        {
            title: '电话',
            dataIndex: 'linktel',
            key: 'linktel',
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) =>
                <Space size='middle'>
                    <div className='editBtn' title='编辑' onClick={() => { this.showModal(record) }}><EditOutlined /></div>
                    <div className='editBtn' title='重置密码' onClick={() => { this.resetPossword(record.code) }}><ReloadOutlined /></div>
                    {record.userpower == 0 ? null : <div className='deleteBtn' title='删除' onClick={() => { this.delete(record.code) }}><DeleteOutlined /></div>}
                </Space>
        }

    ];
    componentDidMount = () => {
        this.getList()
    }
    // 获取数据
    getList = () => {
        let tableData = [
            {
                code: '1',
                account: 'admin',
                realname: '管理员',
                emailaddress: '111@163.com',
                linktel: '13111111111',
                usergender: '1',
                userpower: 0,
            },
            {
                code: '2',
                account: '13222222222',
                realname: '张三',
                emailaddress: '222@163.com',
                linktel: '13222222222',
                usergender: '0',
                userpower: 1,
            }
        ]
        this.setState({
            tableData
        })
    }
    // 搜索函数
    handleSearch = values => {
        let pagination = this.state.pagination
        pagination.current = 1
        this.setState({
            search: values,
            pagination
        }, () => {
            //this.getList()
        })
    }
    // 翻页函数
    paginationChange = pagination => {
        this.setState({
            pagination
        }, () => {
            //this.getList()
        })
    }
    // 新增编辑弹窗
    showModal = values => {
        if (values == 'add') {
            this.setState({
                current: values,
                showModal: true
            })
        } else {
            this.setState({
                current: values.code,
                showModal: true
            }, () => {
                setTimeout(() => {
                    this.formRef.current.setFieldsValue(values)
                    this.formRef.current.validateFields()
                });
            })
        }
    }
    // 新增编辑保存
    handleModalOk = () => {
        if (this.state.current == 'add') {
            //新增
            this.formRef.current.validateFields().then(values => {
                values.code = `add${this.add.toString()}`
                this.add++;
                let tableData = this.state.tableData;
                let newData = []
                tableData.map(item=>{
                    newData.push(item)
                })
                newData.push(values)
                message.success('添加用户成功')
                this.setState({
                    current: '',
                    tableData:newData,
                    showModal: false
                })
            })
        } else {
            //编辑
            this.formRef.current.validateFields().then(values => {
                values.code = this.state.current;
                let tableData = this.state.tableData
                let newData = []
                tableData.map(item=>{
                    if(values.code == item.code){
                        newData.push(values)
                    }else{
                        newData.push(item)
                    }
                })
                message.success('编辑用户成功')
                this.setState({
                    tableData:newData,
                    current: '',
                    showModal: false
                })
            })
        }
    }
    // 新增弹窗取消
    handleModalCancel = () => {
        this.formRef.current.resetFields();
        this.setState({
            showModal: false,
            current: '',
        })
    }
    //重置密码
    resetPossword = code => {
        message.success('重置密码成功，初始密码为888888')
    }
    //删除
    delete = code => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '您确定要删除此用户吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                message.success('删除用户成功');
                let tableData = this.state.tableData
                let newData = []
                tableData.map(item => {
                    if (item.code !== code) {
                        newData.push(item)
                    }
                })
                this.setState({
                    tableData: newData
                })
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        return (
            <div className='userSettingWrap'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className='mySearchFormWrap'>
                    <SearchForm formList={this.searchFormList} buttonText='搜索' handleSearch={this.handleSearch} />
                    <Button onClick={() => { this.showModal('add') }}>添加用户</Button>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <MyTable columns={this.columns} data={this.state.tableData} />
                    <MyPagination pagination={this.state.pagination} handlePaginationChange={this.paginationChange} pageSizeOptions={[10, 20, 30, 40]} />
                </div>
                <Modal
                    title={this.state.current == 'add' ? '添加用户' : '编辑用户'}
                    visible={this.state.showModal}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form
                        {...formItemLayout}
                        name="changePwd"
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="account"
                            label="账号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号',
                                },
                                {
                                    pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                                    message: "请输入正确的手机号"
                                }
                            ]}
                            hasFeedback
                        >
                            <Input disabled={this.state.current != 'add'} allowClear maxLength={11} />
                        </Form.Item>
                        <Form.Item
                            name="userpower"
                            label="类型"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择类型',
                                }
                            ]}
                            hasFeedback
                        >
                            <Select
                                placeholder="请选择类型"
                                allowClear
                            >
                                <Option value={0}>管理员</Option>
                                <Option value={1} >系统使用者</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="realname"
                            label="真实姓名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入真实姓名',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item
                            name="emailaddress"
                            label="邮箱"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                                {
                                    pattern: new RegExp(
                                        "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$",
                                        "g"
                                    ),
                                    message: `请输入正确的邮箱`
                                }
                            ]}
                            hasFeedback
                        >
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item
                            name="linktel"
                            label="联系电话"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入联系电话',
                                },
                                {
                                    pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                                    message: "请输入正确的手机号！"
                                }
                            ]}
                            hasFeedback
                        >
                            <Input allowClear maxLength={11} />
                        </Form.Item>
                        <Form.Item
                            name="usergender"
                            label="性别"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择性别',
                                }
                            ]}
                            hasFeedback
                        >
                            <Select
                                placeholder="请选择性别"
                                allowClear
                            >
                                <Option value={"1"}>男</Option>
                                <Option value={"0"}>女</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default TablePage;