import { Typography, Button, Input, Table, Menu, Modal } from "antd"
import { columns, components } from "./defaultColumns"
import { useEffect, useState } from 'react'
import './teacher.scss'
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../core/store/features/teachers/teachersSlice"
import { getTeachers } from "../../core/store/features/teachers/getTeachers"
import TeacherModal from "./TeacherModal/TeacherModal"
import ButtonConfig from "../../components/ui/Button/Button"

const teacherBtns = ['ВСЕ', 'НЕПОДВЕРЖДЕННЫЕ', 'АКТИВНЫЕ', 'В БЛОКЕ']

function Teachers() {
  const dispatch = useDispatch()
  const [btn, setBtn] = useState(teacherBtns[0])
  const { teachers, isOpen } = useSelector(state => state.teachers)
  useEffect(() => {
    dispatch(getTeachers())
  }, [dispatch])

  const onClick = () => {
    console.log('1234');
  }

  const onCancel = () => {
    dispatch(openModal())
  }

  console.log(teachers);


  return (
    <div className="teachers">
      <div className="teachers__title">
        <Typography.Title>Управление преподaвателями</Typography.Title>
        <ButtonConfig children={'ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ'} onClick={onCancel}/>
      </div>
      <Menu
            mode="horizontal"
            items={teacherBtns.map((item, index) => (
              {
                label: <Button>{item}</Button>,
                key: index
              }
            ))}
            selectedKeys={[btn]}
            onClick={onClick}
        />
      <Input 
        placeholder="Поиск"
      />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={teachers[0]?.data}
        columns={columns}
        rowKey='id'
      />
      <Modal
        open={isOpen}
        onCancel={onCancel}
        width={'800px'}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <TeacherModal />
      </Modal>
    </div>  
  )
}

export default Teachers
