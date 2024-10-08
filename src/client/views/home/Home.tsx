import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import request from 'umi-request';
import { useUser } from '../../hooks/useUser';

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

interface SelectedProps {
  id: number
  xnId: number
  courseId: number
  userId: number
  xq: string
  openTime: string
  status: number
  createdAt: string
  updatedAt: string
}

const HomePage = () => {
  const actionRef = useRef<ActionType>();

  const user = useUser()

  const [selected, setSelected] = useState<SelectedProps[]>([])

  const ids = selected.map(item => item.courseId) || []

  useEffect(() => {
    if (user.user) {
      getSelectedData()
    }
  }, [user.user])

  async function getSelectedData() {
    try {
      const res = await request('/api/choose/getSelected', {
        headers: {
          Authorization: 'bearer ' + user.user?.token
       },
      })
      console.log("打印",res)
      setSelected(res.data || [])
    }catch(e) {
      /** */
    }
  }

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
        <Button disabled={ids.includes(record.id)}  type='link' onClick={() => handleSelected(record.id) }>选课</Button>,
        <Button disabled={!ids.includes(record.id)} type='link' danger onClick={() => handleDeSelected(record.id)}>退课</Button>,
      ],
    },
  ];

  async function handleSelected(courseId: number) {
    try {
      const res = await request('/api/choose/select', {
        method: 'POST',
        headers: {
           Authorization: 'bearer ' + user.user?.token
        },
        data: {
          courseId
        }
      })
      if (res.code === 0) {
        message.success('选课成功')
        await getSelectedData()
        actionRef.current?.reload()
      } else {
        message.error(res.message)
      }
    }catch(e) {
      /** */

    }
  }

  async function handleDeSelected(courseId: number) {
    try {
      const res = await request('/api/choose/deselect', {
        method: 'POST',
        headers: {
          Authorization: 'bearer ' + user.user?.token
       },
        data: {
          courseId
        }
      })
      if (res.code === 0) {
        await getSelectedData()
        message.success('退课成功')
        actionRef.current?.reload()
      } else {
        message.error(res.message)
      }
    }catch(e) {
      /** */
      console.error('')
    }
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
        headerTitle={`已选(${selected?.length || 0}) : ${selected?.map((item:any) => item.CourseModel.name +'-'+ item.CourseModel.code)}`}
      />
    </>
  );
};

export default HomePage;