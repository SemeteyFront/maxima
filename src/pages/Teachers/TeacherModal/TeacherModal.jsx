import { Typography, Divider, Select, Input, Checkbox, Button } from "antd"
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonConfig from "../../../components/ui/Button/Button";
import { addTeacher } from "../../../core/store/features/teachers/addTeacher";
import { openModal } from "../../../core/store/features/teachers/teachersSlice";
import { options } from "./arrays";
import './teacherModal.scss'

function TeacherModal() {
  const dispatch = useDispatch()
  const [registration, setRegistration] = useState(false)
  const [ isSelect, setIsSelect ] = useState('Russia')
  const [ formData, setFormData ] = useState({
    'login': '',
    'lastName': '',
    'firstName': '',
    'patronymic': '',
    'email': '',
    'birthDate': '',
    'password': "123456",
    'repassword': "123456",
  })

  console.log(formData);

  const dataChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleChange = (value) => {
    setIsSelect(value)
  };

  const handleCreate = () => {
    dispatch(addTeacher(formData))
    dispatch(openModal())
    console.log(123456678);
  }

  return (
    <div className="teacherModal">
      <Typography.Title level={3}>Добавление преподователя</Typography.Title>
      <Divider>Данные для регистрации</Divider>
      <div className="teachers__form">
        <Input required onChange={(e) => dataChange(e)} name="login" placeholder="Логин *"/>
        <div className="teacher__label">
          <label>Страна</label>
          <Select
            name='country'
            defaultValue={isSelect}
            onChange={handleChange}
            options={options}
          />
        </div>
        <Input required={registration} name="phone" placeholder="Номер телефона *"/>
      </div>
      <Checkbox
        style={{marginBottom: '20px'}}
        value={'registration'}
        checked={registration}
        onChange={() => setRegistration(!registration)}
      >
        Регистрация по телефону
      </Checkbox>
      <Divider>Личные данные</Divider>
      <div className="teachers__datas">
        <Input required onChange={(e) => dataChange(e)} name="lastName" placeholder="Фамилия *"/>
        <Input required onChange={(e) => dataChange(e)} name="firstName" placeholder="Имя *"/>
        <Input onChange={(e) => dataChange(e)} name="patronymic" placeholder="Отчество"/>
      </div>
      <div className="teachers__datas">
        <Input onChange={(e) => dataChange(e)} name="email" placeholder="Email"/>
        <Input required onChange={(e) => dataChange(e)}name="birthDate" type="date" placeholder="Дата рождения *"/>
      </div>
      <div className="teachers__btn">
        <Button onClick={() => dispatch(openModal())}>Закрыть</Button>
        <ButtonConfig children={'СОЗДАТЬ'} onClick={handleCreate}/>
      </div>
    </div>
  )
}

export default TeacherModal
