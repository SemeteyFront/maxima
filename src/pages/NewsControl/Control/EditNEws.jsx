import { Col, Input, Row, Typography, Button, Checkbox, ConfigProvider, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/en_US';
import SlateComponent from '../../../components/ui/Slate/Slate';
import { ChangeNews, getImage } from '../../../core/store/features/news/newsSlice';
import '../style.scss'
import ButtonConfig from '../../../components/ui/Button/Button';

function EditNews({setOpen}) {
  const [value,setValue] = useState(''); 
  const [titleNews, setTitleNews ] = useState('')
  const [checkValues, setCheckValues] = useState([])
  const [fixed, setFixed] = useState(false)
  const [delayed, setDelayed] = useState(false)
  const dispatch = useDispatch()

  const { editNews, getImg } = useSelector(state => state.news)

  const onChange = (checkedValues) => {
    setCheckValues(checkedValues)
  };

  const uploadImg = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    dispatch(getImage(formData))
  }
  
  const changeNewsById = () => {
    const text = value[0]?.children[0]?.text
    const obj = {
      id: editNews.id,
      data: {
        title: titleNews,
        titleImage: getImg,
        text: text,
        forStudents: checkValues.includes('students'),
        forTeachers: checkValues.includes('teachers'),
        forPartners: checkValues.includes('partners'),
        forBlog: checkValues.includes('blog'),
        isAttached: true,
        delayedDatetime: new Date().toISOString().slice(0, -1),
        newsTags: ['Java', 'C#', 'React'],
      }
    }

    dispatch(ChangeNews(obj))
    setOpen(false)
  }

  return (
    <>
      <Row style={{marginBottom: '30px'}}>
        <Col span={24}>
          <Typography.Title level={3}>Редактирование новости</Typography.Title>
        </Col>
      </Row>
      <Row style={{marginBottom: '20px'}}>
        <Col span={24}>
          <label className='titleNews' htmlFor="titleNews">
            Заголово новости *
          </label>
          <Input
            value={titleNews ? titleNews : editNews.title} 
            id='titleNews' 
            style={{height: '45px', borderRadius: '20px'}} 
            placeholder="Заголовок новости"
            onChange={(e) => setTitleNews(e.target.value)}/>
        </Col>
      </Row>
      <Row style={{marginBottom: '20px'}}>
        <Col span={12}>
          <Typography.Text style={{fontSize: '24px', color: 'gray'}}>Постер</Typography.Text>
        </Col>
      </Row>
      <Row style={{marginBottom: '20px'}}>
        {/* <Col span={12}> */}
          <input type="file" onChange={(e) => uploadImg(e)}/>
        {/* </Col> */}
      </Row>
      <img className='modal-img' src={`https://api.selcdn.ru/v1/SEL_214275/storage/${editNews.titleImage.storageFileName}`} alt="тфегку" />
      <Checkbox.Group  onChange={onChange}>
        <Row>
          <Col span={24} offset={1}>
            <Checkbox value={'blog'}>Для блога</Checkbox>
          </Col>
          <Col span={24} offset={1}>
            <Checkbox value={'students'}>Для учеников</Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={1}>
            <Checkbox value={'teachers'}>Для учителей</Checkbox>
          </Col>
          <Col span={24} offset={1}>
            <Checkbox value={'partners'}>Для партнера</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
      <Row style={{margin: '20px 0'}}>
        <Typography.Text>Выберите рубрики</Typography.Text>
      </Row>
      <Checkbox style={{marginBottom: '20px'}} value={'delayed'} checked={delayed} onChange={() => setDelayed(!delayed)}>Отложенная публикация</Checkbox>
      <Row style={{marginBottom: '20px'}}>
        <Col span={24}>
          <label className='titleNews' htmlFor="titleNews">
            Введите дату и время
          </label>
          <ConfigProvider locale={locale}>
            <DatePicker
            placeholder='Shera kot'
              style={{
                width: '100%',
                height: '45px',
                border: '1px solid rgb(207, 191, 191)'
              }}
            />
          </ConfigProvider>
          {/* <Input.Date id='titleNews' style={{height: '45px', borderRadius: '20px'}} placeholder="Заголовок новости"  onChange={(e) => setTitleNews(e)}/> */}
        </Col>
      </Row>
      <Checkbox value={'fixed'} checked={fixed} onChange={() => setFixed(!fixed)}>Закрепленный пост</Checkbox>
        <SlateComponent sendNews={(value) => setValue(value)}/>
        <Row style={{display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '20px'}}>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
          <ButtonConfig children={'Редактировать'} onClick={changeNewsById}/>
        </Row>
    </>
  );
}



export default EditNews