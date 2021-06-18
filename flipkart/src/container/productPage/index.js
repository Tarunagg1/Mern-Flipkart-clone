import React, { useEffect, Component } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../actions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import getParams from '../../utils/getParams';
import Card from '../Ui/Card/Card';
import './index.css';

export default function ProductPage(props) {
    const dispatch = useDispatch();
    const { page } = useSelector(state => state.product);

    useEffect(() => {
        const params = getParams(props.location.search);

        dispatch(getProductPage(params));
    }, [])

    return (
        <div style={{ margin: '0 10px' }}>
            <Carousel
                renderThumbs={() => { }}
            >
                {
                    page.banners && page.banners.map((bann, index) => (
                        <a href={`bannerClicked?categoryId=${bann.category}&type=${bann.type}`} key={index} style={{display:'block'}}>
                            <img src="https://rukminim1.flixcart.com/flap/1800/1800/image/9fddb61f281042c8.jpg?q=80" alt="" />
                        </a>
                    ))
                }
            </Carousel>
            <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',margin:'10px 0'}}>
                {
                    page.products && page.products.map((prod,ind) => (
                        <Card key={ind}
                            style={{
                                width:'400px',
                                height:'auto',
                                maegin:'0 5px'
                            }}
                        >
                            <img src="https://rukminim1.flixcart.com/image/312/312/jnj7iq80/mobile/y/q/d/apple-iphone-xr-mry52hn-a-original-imafa6zkfgwpnsgz.jpeg?q=70" alt="" />
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
