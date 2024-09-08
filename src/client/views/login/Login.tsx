import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
    ProConfigProvider,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import { useState } from 'react';
import request from 'umi-request';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

type LoginType = 'student' | 'admin';


const LoginPage = () => {
    const [loginType, setLoginType] = useState<LoginType>('student');
    const user = useUser();
    const navigation = useNavigate()
    
    async function onFinish(values: any) {
        try {
            const res = await request(`/api/auth/login`, {
                method: 'POST',
                data: values
            })
            if (res.code != 0) {
                message.error(res.message || '未知错误')
            } else {
                message.success('登录成功')
                localStorage.setItem('token', res.data.token)
                user.setUserInfo(res.data)
                navigation('/', {
                    replace: true
                })
            }
        }catch(e) {

        }
    }
    return (
        <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: 'white' }}>
                <LoginForm
                    title="选课系统"
                    subTitle="欢迎使用选课系统，请先登录"
                    onFinish={onFinish}
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    >
                        <Tabs.TabPane key={'student'} tab={'学生登录'} />
                        <Tabs.TabPane key={'admin'} tab={'管理员登录'} />
                    </Tabs>
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'用户名: admin or user'}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'密码: ant.design'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;