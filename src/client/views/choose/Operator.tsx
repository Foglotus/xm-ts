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

type XnInfo = {
    id?: number
    name: string
    status: number
};

interface OperatorProps {
    onSuccess: Function
    onCancel: Function
    info: {
        open?: boolean
        mode: 'edit' | 'add'
        data?: XnInfo
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
                    request('/api/xn/add', {
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
                    request('/api/xn/update', {
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
        <Modal open={info.open} title={info.mode === 'add' ? '新建' : '编辑'} onCancel={() => onCancel()} onOk={() => handleOnOk()}>
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
                    label="id"
                    disabled={info.mode === 'edit'}
                    hidden={info.mode === 'add'}
                    placeholder="请输入ID"
                    required={info.mode === 'edit'}
                />
                <ProFormText
                    width="md"
                    name="name"
                    label="名称"
                    placeholder="请输入名称"
                    required
                />
            </ProForm>
        </Modal>
    );
};

export default Operator;