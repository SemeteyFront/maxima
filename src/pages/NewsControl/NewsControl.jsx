import { Table, Typography, Input, Button, Row, Col, Dropdown, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AddNews from './Control/AddNews';
import { SettingTwoTone, EditFilled, CloseCircleFilled } from '@ant-design/icons'
import { deleteNews, EditNewsById } from '../../core/store/features/news/newsSlice';
import { getNews } from '../../core/store/features/news/newsSlice';
import { EditableRow } from '../EditableRow';
import './style.scss'
import EditNews from './Control/EditNEws';
import ButtonConfig from '../../components/ui/Button/Button';

const NewsControl = () => {
  const dispatch = useDispatch()
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isEditOpen, setIsEditOpen ] = useState(false);
  const [ value, setValue ] = useState('')
  const { data } = useSelector(state => state.news)

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])
  
  const handleCancel = () => {
    setIsOpen(false);
    setIsEditOpen(false)
  };

  const isValue = (e) => {
    setValue(e)
  }

  const handleEdit = (id) => {
    setIsEditOpen(true)
    dispatch(EditNewsById(id))
  }

  const filterData = data?.filter(item => item.text?.toLowerCase().includes(value.toLocaleLowerCase()))

  const defaultColumns = [
    {
      title: 'Заголово новости',
      dataIndex: 'text',
      width: '50%',
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      width: '30%',
    },
    {
      title: 'Кол-во просмотров',
      dataIndex: 'viewsCount',
      width: '20%',
    },
    {
      title: 'Управление',
      width: '30%', 
      render: (_, record) => {
        const items = [
          {
            key: '1',
            label: (
                <Button style={{border: 'none', width: '100%', textAlign: 'start'}} onClick={() => handleEdit(record.id)} key="open"><EditFilled />Редактировать</Button>
            )
            
          },
          {
            key: '2',
            label: (
                <Button style={{border: 'none', width: '100%', textAlign: 'start'}} key="open-meta"><EditFilled />Редактировать по meta тегам</Button>
            )
            
          },
          {
            key: '3',
            label: (
                <Button style={{border: 'none', width: '100%', textAlign: 'start'}} onClick={() => dispatch(deleteNews(record.id))} key="key"><CloseCircleFilled style={{color: 'red'}}/><Typography.Text style={{color: 'red'}}>Удалить</Typography.Text></Button>
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

  const components = {
    body: {
      row: EditableRow,
    },
  };
  const columns = defaultColumns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        title: col.title,
      }),
    };
  });

  return (
    <div style={{width: '1000px'}}>
      <Row>
        <Col span={12}> 
          <Typography.Title>Управление новостями</Typography.Title>
        </Col>
        <Col span={12} style={{textAlign: 'end'}}>
          <ButtonConfig children={'Добавить новость'} onClick={() => setIsOpen(true)}/>
        </Col>
      </Row>
      <Input 
        value={value} 
        onChange={(e) => isValue(e.target.value)} 
        style={{width: '250px',borderRadius: '10px',marginBottom: '20px',border: '0.5px solid #E8E2E2'}} 
        placeholder='поиск'/>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={filterData}
        columns={columns}
        rowKey='id'
      />
      <Modal
        open={isOpen}
        onCancel={handleCancel}
        width={'800px'}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <AddNews setOpen={setIsOpen}/>
      </Modal>
      <Modal
        open={isEditOpen}
        onCancel={handleCancel}
        width={'800px'}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <EditNews setOpen={setIsEditOpen}/>
      </Modal>
    </div>
  );
};
export default NewsControl;


