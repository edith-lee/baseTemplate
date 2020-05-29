import React from 'react';
import { Form, Input, Button, message } from 'antd';
import "./login.less"
import { UserOutlined, LockOutlined, SecurityScanOutlined } from '@ant-design/icons';
import md5 from 'js-md5'
import VerificationCode from './verificationCode'
export default class Login extends React.Component {
    state = {
        loading: false,
        showVerify: true,  //是否显示验证码
        code:'s7Gy',  //验证码
    }
    componentDidMount = () => {
    }
    onSubmit = (values) => {
        this.setState({
            loading: true
        })
        if (values.username && values.password) {
            let password = md5(values.password)
            if (window.g.haveBigData && window.g.bigData) {
                this.props.history.push("/overview");
            } else {
                this.props.history.push("/main/grid");
            }
        }
    }
    render() {
        let layout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        let center = {
            wrapperCol: {
                span: 21,
            }
        }
        return (
            <div className='loginWrap'>
                <div className='formWrap'>
                    <div className='formTitle'>
                        <p className='hello'>你好！</p>
                        <p className='welcome'>欢迎登录XXXXXXXX系统！</p>
                    </div>
                    <Form
                        {...layout}
                        name="basic"
                        hideRequiredMark={true}
                        onFinish={this.onSubmit}
                    >
                        <Form.Item
                            label=""
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的用户名',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined style={{ color: '#cccccc', fontSize: '26px' }} />} placeholder='请输入用户名' className='inputWrap' />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码',
                                },
                            ]}
                        >
                            <Input.Password visibilityToggle={false} className='inputWrap' prefix={<LockOutlined style={{ color: '#cccccc', fontSize: '26px' }} />} placeholder='请输入密码' />
                        </Form.Item>
                        {this.state.showVerify ? <Form.Item
                            label=""
                            name="verificationCode"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}
                        >
                            <div className='verification'>
                                <Input prefix={<SecurityScanOutlined style={{ color: '#cccccc', fontSize: '26px' }} />} placeholder='请输入验证码' className='codeWrap' />
                                <VerificationCode code={this.state.code}/>
                            </div>
                        </Form.Item> : null}
                        <Form.Item style={{ textAlign: 'right' }} {...center}>
                            <Button type="primary" loading={this.state.loading} htmlType="submit" className='btn'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >

        )
    }
}