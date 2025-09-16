import { Flex, Select, Spin, Table, Typography } from 'antd';
import { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { ERoles, IUser } from '@admin-management/types';
import { useTable } from '../hooks/useTable';

const { Title } = Typography;

export function UserTable() {
  const [selectedRoles, setSelectedRoles] = useState<ERoles[]>([]);
  const { users, roles, isLoading, handleChangeRoles } = useTable();

  const columns: ColumnsType<IUser> = useMemo(
    () => [
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
        render: (_, user) => (
          <Select
            mode="multiple"
            value={user.roles}
            onChange={(vals) => handleChangeRoles(user.id, vals)}
            options={roles.map(({ role }) => ({ label: role, value: role }))}
            style={{ minWidth: 220 }}
          />
        ),
      },
    ],
    [roles, handleChangeRoles]
  );

  const filteredUsers = useMemo(() => {
    return selectedRoles.length === 0
      ? users
      : users.filter(({ roles }) =>
          roles.some((role) => selectedRoles.includes(role))
        );
  }, [users, selectedRoles]);

  return (
    <div>
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
          onChange={setSelectedRoles}
          style={{ minWidth: 260 }}
        />
      </Flex>
      <Spin spinning={isLoading}>
        <Table<IUser>
          pagination={false}
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={filteredUsers}
        />
      </Spin>
    </div>
  );
}
