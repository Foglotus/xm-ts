import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import request from 'umi-request';
import Operator from './Operator';
import { PermitEnum, PermitOptions } from '../../config';

type GithubIssueItem = {
  id: number
  name: string
  username: string
  password: string
  role: string
  permit: any
  token: any
  status: number
  createdAt: string
  updatedAt: string
};

const AccountPage = () => {
  const [openOperator, setOpenOperator] = useState<any>({
    open: false,
    mode: 'add',
  });
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户姓名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '登录名',
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      disable: true,
      title: '权限',
      dataIndex: 'permit',
      search: false,
      renderText(text) {
        return (
          <Space wrap>
            {text?.split(',').map((item: PermitEnum) => PermitOptions.find(op => op.value === item)?.label)?.map(((l:any) => <Tag>{l}</Tag>))}
          </Space>
        );
      },
    },
    {
      disable: true,
      title: '角色',
      dataIndex: 'role',
      search: false,
      renderText(text) {
        return (
          <Tag>{text}</Tag>
        );
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Button type='link' onClick={() => setOpenOperator({
          open: true,
          mode: 'edit',
          data: record,
        })}>编辑</Button>,
      ],
    },
  ];

  return (
    <>
      {/* 修改或者添加用户 */}
      <Operator info={openOperator} onCancel={() => setOpenOperator({
        open: false,
      })} onSuccess={() => {
        actionRef.current?.reload()
        setOpenOperator({
          open: false,
        })
      }} />
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          return request<{
            data: GithubIssueItem[];
          }>('/api/user/list', {
            params,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setOpenOperator({
            open: true,
            mode: 'add',
          })}>
            新建用户
          </Button>,
        ]}
      />
    </>
  );
};

export default AccountPage;