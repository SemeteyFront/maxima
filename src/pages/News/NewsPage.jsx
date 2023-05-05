import React, {useEffect, useState} from 'react';
import Title from "antd/lib/typography/Title";
import {Space} from "antd";
import CardBase from "../../components/ui/CardBase";
import NewsService from "../../core/services/NewsService";
import { ControlTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    
    useEffect(() => {
        NewsService.getAllNews()
            .then(r => setNews(r.data.data))
    }, [])

    

    return (
        <>
            <Link to={'/management'}><ControlTwoTone style={{fontSize: '30px'}}/></Link>
            <Title level={3}>Новости</Title>
            <Space align={'start'}>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px'}}>
                {
                    news.map((n, index) => <CardBase
                        img={n.titleImage?.url}
                        title={n.title}
                        desc={n.text}
                        key={index}
                    />)
                }
                </div>
            </Space>
            
        </>
    );
};

export default NewsPage;