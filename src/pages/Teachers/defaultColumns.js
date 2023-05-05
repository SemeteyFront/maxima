import {Button, Typography, Dropdown } from 'antd'
import { SettingTwoTone, CloseCircleFilled, EditFilled} from '@ant-design/icons'
import { EditableRow } from '../EditableRow';
import { store } from '../../core/store/index'
import { banTeacher } from '../../core/store/features/teachers/banTeacher';

const defaultColumns = [
  {
    title: 'Фамилия Имя Отчество',
    dataIndex: 'firsName',
    width: '25%',
    render: (_, record) => (
      `${record.firstName} ${record.lastName} ${record.patronymic}`
    ),
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    width: '8%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '22%',
  },
  {
    title: 'Номер телефона',
    dataIndex: 'phone',
    width: '20%',
  },
  {
    title: 'Статус',
    dataIndex: 'state',
    width: '12%',
    render: (_, record) => (
      <span>{`${record.state}`}</span>
    ),
  },
  {
    title: 'Управление',
    width: '12%', 
    render: (_, record) => {
      const items = [
        
        {
          key: '3',
          label: (
              <Button onClick={() => store.dispatch(banTeacher(record.id))} style={{border: 'none', width: '100%', textAlign: 'start'}} key="delete"><CloseCircleFilled style={{color: 'red'}}/><Typography.Text style={{color: 'red'}}>Забанить</Typography.Text></Button>
          )
          
        },
      ]
      return (
        <Dropdown menu={{items}}>
          <SettingTwoTone />
        </Dropdown>
      );
    },
  },
];

export const columns = defaultColumns.map((col) => {
  return {
    ...col,
    onCell: (record) => ({
      record,
      title: col.title,
    }),
  };
});

export const components = {
  body: {
    row: EditableRow,
  },
};