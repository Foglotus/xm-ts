import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormCheckbox, ProFormDatePicker, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { KcEnum, OpenTimeOptions, PermitOptions, RoleEnum, RoleOptions, XQEnum } from '../../config';
import request from 'umi-request';
import { useUser } from '../../hooks/useUser';


interface AddCourse{
    id: string;
    name: string;
    code: string; // 课程代码
    description?: string; // 课程描述
    capacity: number; // 课程容量
    xnId: number; // 学年id
    xq: XQEnum; // 学期
    openTime: KcEnum[] | any; // 开课时间
    status?: number
}

interface OperatorProps {
    onSuccess: Function
    onCancel: Function
    info: {
        open?: boolean
        mode: 'edit' | 'add'
        data?: AddCourse
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
                code: info.data?.code,
                description: info.data?.description,
                openTime: info.data?.openTime?.split(','),
                status: info.data?.status,
            })
        } else if(info.mode === 'add' && info.open) {
            formRef.current?.resetFields()
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
                    request('/api/course/add', {
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
                    request('/api/course/update', {
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
        <Modal open={info.open} title={info.mode === 'add' ? '新建课程' : '编辑课程'} width="768px" onCancel={() => onCancel()} onOk={() => handleOnOk()}>
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
                    label="课程id"
                    disabled={info.mode === 'edit'}
                    hidden={info.mode === 'add'}
                    placeholder="请输入ID"
                    required={info.mode === 'edit'}
                />
                <ProFormText
                    width="md"
                    name="name"
                    label="课程名称"
                    placeholder="请输入名称"
                    required
                />
                <ProFormText width="md" name="code" label="课程编号" required placeholder="请输入编号" />
                <ProFormText width="md" name="capacity" label="课程人数" required placeholder="请输入" />
                <ProFormCheckbox.Group label="开课时间" name="openTime" required options={OpenTimeOptions} />
                <ProFormTextArea width="md" name="description" label="课程描述"  placeholder="请输入" />
            </ProForm>
        </Modal>
    );
};

export default Operator;