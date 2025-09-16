import { Flex, Select, Spin, Table, Typography } from 'antd';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { ERoles, IUser } from '@admin-management/types';
import { useTable } from '../hooks/useTable';
const { Title } = Typography;

export default function UserTable() {
  const { users, roles, isLoading, handleChangeRoles } = useTable();
  const [selectedRoles, setSelectedRoles] = useState<ERoles[]>([]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns: ColumnsType<IUser> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, record) => (
        <Select
          mode="multiple"
          value={record.roles}
          onChange={(vals) => handleChangeRoles(record.id, vals)}
          options={roles.map(({ role }) => ({ label: role, value: role }))}
          style={{ minWidth: 220 }}
        />
      ),
    },
  ];

  return (
    <>
      <Flex vertical style={{ padding: 16, maxWidth: 1200, margin: '0 auto' }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Users
        </Title>
        <Flex gap={8} style={{ marginBottom: 12 }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by role"
            options={roles.map(({ role }) => ({ label: role, value: role }))}
            value={selectedRoles}
            onChange={(vals) => setSelectedRoles(vals as ERoles[])}
            style={{ minWidth: 260 }}
          />
        </Flex>
        <Spin spinning={isLoading}>
          <Table<IUser>
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={
              selectedRoles.length
                ? users.filter((u) =>
                    u.roles.some((r) => selectedRoles.includes(r))
                  )
                : users
            }
          />
        </Spin>
      </Flex>
    </>
  );
}
