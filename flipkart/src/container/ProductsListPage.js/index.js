import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProductBySlug } from '../../actions/product.action';
import Layout from '../../components/Layout'
import { genratePublicUrl } from '../../env';
import './product.css';

export default function ProductListpages(props) {
    const dispatch = useDispatch();
    const { products, productByPrice } = useSelector(state => state.product);

    const [Pricerange, setSetPricerange] = useState({
        under5k:'5000',
        under10k:'10000',
        under15k:'15000',
        under20k:'20000',
        under30k:'30000'
    })

    useEffect(() => {
        const { match } = props;
        dispatch(getProductBySlug(match.params.slug))
    }, [])

    return (
        <Layout>
            {
                Object.keys(productByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardheader">
                                <div>{props.match.params.slug} mobile Under {Pricerange[key]}</div>
                                <button>View All</button>
                            </div>
                            <div style={{display:'flex'}}>
                                {
                                    productByPrice[key].length > 0 ? (productByPrice[key].map(prod => (
                                        <div className="productContainer">
                                            <div className="productimg">
                                                <img src={genratePublicUrl(prod.productsPictures[0].img)} alt="not found" srcset="" />
                                            </div>
                                            <div className="productinfo">
                                                <div style={{ margin: '5px 0' }}>{prod.name}</div>
                                                <div>
                                                    <span>4.2</span> &nbsp;
                                         <span>454</span>
                                                </div>
                                                <div className="prodprice">{prod.price}</div>
                                            </div>
                                        </div>
                                    ))) : (
                                        <h5>No product found</h5>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }

        </Layout>
    )
}
