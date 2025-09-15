import { Flex, message, Select, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ERoles, IUser } from '@admin-management/types';
import { useUserApi } from '../hooks/useUserApi';
import { useRolesApi } from '../hooks/useRolesApi';

const { Title } = Typography;

export default function UserTable() {
  const { users, loading, handleChangeRole } = useUserApi();
  const { isLoading, roles } = useRolesApi();

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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_value, record) => (
        <Select
          value={record.role}
          onChange={(val) => handleChangeRole(record.id, val as ERoles)}
          options={roles.map(({ role }) => ({ label: role, value: role }))}
          style={{ minWidth: 160 }}
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
          <div>Add multi select</div>
        </Flex>
        <Spin spinning={loading}>
          <Table<IUser>
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={users}
          />
        </Spin>
      </Flex>
    </>
  );
}
