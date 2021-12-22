import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../sevices/cryptoNewsApi';
import { useGetCryptosQuery } from '../sevices/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImg = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';


const News = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 100 });
    const { data } = useGetCryptosQuery(100);
    if(!cryptoNews?.value) return 'Loading...';

    return (
        <Row gutter={[ 24, 24 ]}>

            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select A Crypto'
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}></Select>
                
                    <Option  value="Cryptocurrency">Cryptocurrency</Option>
                    {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                </Col>
            )}

            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title level={5} className='news-title'>{news.name}</Title>
                                <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImg} alt='news' />
                            </div>
                            <p>{news.description > 150
                                ? `${news.description.substring(0, 150)} ...`
                                : news.description
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImg} alt='news' />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
