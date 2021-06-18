import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductBySlug } from '../../../actions/index';
// import Layout from '../../../components/Layout'
import { genratePublicUrl } from '../../../env';
import Card from '../../Ui/Card/Card'


export default function ProductStore(props) {
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
        <>
            {
                Object.keys(productByPrice).map((key) => {
                    return (
                        <Card
                            headerLeft = {`${props.match.params.slug} mobile Under ${Pricerange[key]}`}
                            headerRight = {<button>View All</button>}
                            style={{
                                width:`calc(100% - 40px)`,
                                margin:"20px"
                            }}
                        >
                           
                            <div style={{ display: 'flex' }}>
                                {
                                    productByPrice[key].length > 0 ? (productByPrice[key].map(prod => (
                                        <>
                                        <Link to={`/${prod.slug}/${prod._id}/p`} style={{display:'block'}} className="productContainer">
                                            <div className="productimg">
                                            <img src="https://rukminim1.flixcart.com/image/416/416/kn22m4w0/mobile/n/u/a/galaxy-f02s-sm-e025fawfins-samsung-original-imagfthzsy3btzkj.jpeg?q=70" alt="not found" srcset="" />
                                                {/* <img src={genratePublicUrl(prod.productsPictures[0].img)} alt="not found" srcset="" /> */}
                                            </div>
                                            <div className="productinfo">
                                                <div style={{ margin: '5px 0' }}>{prod.name}</div>
                                                <div>
                                                    <span>4.2</span> &nbsp;
                                                    <span>454</span>
                                                </div>
                                                <div className="prodprice">{prod.price}</div>
                                            </div>
                                        </Link>                      
                                        </>
                                    ))) : (
                                        <h5>No product found</h5>
                                    )
                                }
                            </div>
                        </Card>
                    )
                })
            }
        </>
    )
}
