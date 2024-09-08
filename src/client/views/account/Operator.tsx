import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormCheckbox, ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { PermitOptions, RoleEnum, RoleOptions } from '../../config';
import request from 'umi-request';
import { useUser } from '../../hooks/useUser';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

type UserInfo = {
    id?: number
    name: string
    username: string
    password: string
    role: string
    permit?: string
    status: number
};

interface OperatorProps {
    onSuccess: Function
    onCancel: Function
    info: {
        open?: boolean
        mode: 'edit' | 'add'
        data?: UserInfo
    }
}

const Operator = (props: OperatorProps) => {

    const { info = {open: false, mode: 'add'}, onSuccess, onCancel } = props

    const user = useUser();

    useEffect(() => {
        if (info.mode === 'edit' && info.open) {
            formRef.current?.setFieldsValue({
                id: info.data?.id,
                name: info.data?.name,
                username: info.data?.username,
                password: info.data?.password,
                role: info.data?.role,
                permit: info.data?.permit?.split(','),
                status: info.data?.status,
            })
        } else if(info.mode === 'add' && info.open) {
            formRef.current?.resetFields()
            formRef.current?.setFieldsValue({
                password: '12345',
                role: RoleEnum.STUDENT,
            })
        }
    }, [info])

    const formRef = useRef<ProFormInstance>();
   
    const getFormatValues = () => {
        console.log('格式化后的所有数据：', formRef.current?.getFieldsFormatValue?.());
    };

    const validateAndGetFormatValue = () => {
        formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
            console.log('校验表单并返回格式化后的所有数据：', values);
        });
    };

    function handleOnOk() {
        try {
            formRef.current?.validateFields().then((values) => {
                console.log('格式化后的所有数据：', values);
                if (info.mode === 'add') {
                    request('/api/user/add', {
                        method: 'POST',
                        data: values,
                        headers: {
                            Authorization: `bearer ${user.user?.token}`
                        }
                    }).then(res => {
                        if (res.code === 0) {
                            message.success('操作成功')
                            onSuccess()
                        } else {
                            message.error(res.message)
                        }
                    })
                } else if (info.mode === 'edit') {
                    request('/api/user/update', {
                        method: 'POST',
                        data: values,
                        headers: {
                            Authorization: `bearer ${user.user?.token}`
                        }
                    }).then(res => {
                        if (res.code === 0) {
                            message.success('操作成功')
                            onSuccess()
                        } else {
                            message.error(res.message)
                        }
                    })
                }
            });
        }catch(e) {
            /** empty */
        }
    }

    return (
        <Modal open={info.open} title={info.mode === 'add' ? '新建用户' : '编辑用户'} onCancel={() => onCancel()} onOk={() => handleOnOk()}>
            <ProForm
                title="新建表单"
                formRef={formRef}
                submitter={{
                    resetButtonProps: {
                        style: {
                            display: 'none',
                        },
                    },
                    submitButtonProps: {
                        style: {
                            display: 'none',
                        },
                    },
                }}
            >
                <ProFormText
                    width="md"
                    name="id"
                    label="用户id"
                    disabled={info.mode === 'edit'}
                    hidden={info.mode === 'add'}
                    placeholder="请输入ID"
                    required={info.mode === 'edit'}
                />
                <ProFormText
                    width="md"
                    name="name"
                    label="用户姓名"
                    placeholder="请输入名称"
                    required
                />
                <ProFormText width="md" name="username" label="用户登录名" required placeholder="请输入名称" />
                <ProFormRadio.Group label="角色" name="role" required options={RoleOptions} />
                <ProFormText width="md" name="password" label="登录密码" required={info.mode === 'add'} placeholder="请输入密码" hidden={info.mode === 'edit'} />
                <ProFormCheckbox.Group
                    name="permit"
                    label="用户权限"
                    options={PermitOptions}
                />
            </ProForm>
        </Modal>
    );
};

export default Operator;