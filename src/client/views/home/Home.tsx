import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import request from 'umi-request';
import { KcEnum, OpenTimeOptions } from '../../config';

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

const HomePage = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '课程名',
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
      title: '课程代号',
      dataIndex: 'code',
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
      title: '开课人数',
      dataIndex: 'capacity',
      ellipsis: true,
      search: false,
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
      title: '已选人数',
      dataIndex: 'selected',
      search: false,
    },
    {
      disable: true,
      title: '描述',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Button type='link' onClick={() => handleSelected(record.id) }>选课</Button>,
        <Button type='link' danger onClick={() => handleDeSelected(record.id)}>退课</Button>,
      ],
    },
  ];

  async function handleSelected(courseId: number) {
    
  }

  async function handleDeSelected(courseId: number) {

  }

  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          return request<{
            data: GithubIssueItem[];
          }>('/api/course/list', {
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
        headerTitle="课程列表"
      />
    </>
  );
};

export default HomePage;