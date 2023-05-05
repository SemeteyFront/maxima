import { Col, Input, Row, Typography, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react';
import SlateComponent from '../../../components/ui/Slate/Slate';
import { addNews, getImage } from '../../../core/store/features/news/newsSlice';
import ButtonConfig from '../../../components/ui/Button/Button';

function AddNews({setOpen}) {
  const [value,setValue] = useState(''); 
  const [titleNews, setTitleNews ] = useState('')
  const [checkValues, setCheckValues] = useState([])
  const dispatch = useDispatch()

  const { getImg } = useSelector(state => state.news)

  const onChange = (checkedValues) => {
    setCheckValues(checkedValues)
  };

  const uploadImg = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    dispatch(getImage(formData))
  }
  
  const handleAddNews = () => {
    const text = value[0]?.children[0]?.text
    const obj = {
      title: titleNews,
      titleImage: getImg && getImg,
      text: text,
      forStudents: checkValues.includes('students'),
      forTeachers: checkValues.includes('teachers'),
      forPartners: checkValues.includes('partners'),
      forBlog: checkValues.includes('blog'),
      isAttached: true,
      delayedDatetime: new Date().toISOString().slice(0, -1),
      newsTags: ['Java', 'C#', 'React'],
    }

    dispatch(addNews(obj))
    setOpen(false)
  }


  return (
    <>
      <Row style={{marginBottom: '30px'}}>
        <Col span={24}>
          <Typography.Title level={3}>Добавление новостей</Typography.Title>
        </Col>
      </Row>
      <Row style={{marginBottom: '20px'}}>
        <Col span={24}>
          <Input style={{height: '40px'}} placeholder="Заголовок новости"  onChange={(e) => setTitleNews(e.target.value)}/>
        </Col>
      </Row>
      <Row style={{marginBottom: '20px'}}>
        <Col span={12}>
          <Typography.Text style={{fontSize: '24px', color: 'gray'}}>Постер</Typography.Text>
        </Col>
      </Row>
      <Row style={{marginBottom: '20px'}}>
        <Col span={12}>
          <input type="file" onChange={uploadImg}/>
        </Col>
      </Row>
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
        <SlateComponent sendNews={(value) => setValue(value)}/>
        <Row style={{display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '20px'}}>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
          <ButtonConfig children={'Добавить'} onClick={handleAddNews}/>
        </Row>
    </>
  );
}



export default AddNews