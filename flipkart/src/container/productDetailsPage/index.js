import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions';
import Layout from '../../components/Layout';
import {
    IoIosArrowForward,
    IoIosStar,
    IoMdCart
} from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../components/Matrialui';
import './index.css';
import { genratePublicUrl } from '../../env';
import { addToCart } from '../../actions';

const ProductDetailsPage = (props) => {
    const dispatch = useDispatch();
    const { productDetails } = useSelector(state => state.product);
    useEffect(() => {

        const { productid } = props.match.params;
        const payload = {
            params: {
                productid
            }
        }
        dispatch(getProductDetails(payload))
    }, [])


    if (Object.keys(productDetails).length === 0) {
        return null;
    }

    return (
        <Layout>
            {/* <div>{product.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            productDetails.product.productsPictures.map((thumb, index) =>
                                <div className="thumbnail">
                                    <img src="https://rukminim1.flixcart.com/image/416/416/kn22m4w0/mobile/n/u/a/galaxy-f02s-sm-e025fawfins-samsung-original-imagfthzsy3btzkj.jpeg?q=70" alt="" srcset="" />
                                    {/* <img src={genratePublicUrl(thumb.img)} alt={thumb.img} /> */}
                                </div>
                            )
                        }
                        <div className="thumbnail active">
                            {
                                productDetails.product.productsPictures.map((thumb, index) =>
                                    <img key={index} src={genratePublicUrl(thumb.img)} alt={thumb.img} />)
                            }
                        </div>
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img src="https://rukminim1.flixcart.com/image/416/416/kn22m4w0/mobile/n/u/a/galaxy-f02s-sm-e025fawfins-samsung-original-imagfthzsy3btzkj.jpeg?q=70" alt="" srcset="" />
                            {/* <img src={genratePublicUrl(productDetails.productsPictures[0].img)} alt={`${productDetails.productsPictures[0].img}`} /> */}
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: '5px',
                                    marginTop: '10px'
                                }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const {_id,name,price} = productDetails.product;
                                    const img = productDetails.product.productsPictures[0].img;
                                    dispatch(addToCart({_id,name,price,img}));
                                    props.history.push('/cart');
                                }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: '5px',
                                    marginTop: '10px'
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>

                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li><a href="#">Home</a><IoIosArrowForward /></li>
                            <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
                            <li><a href="#">Samsung</a><IoIosArrowForward /></li>
                            <li><a href="#">{productDetails.product.name}</a></li>
                        </ul>
                    </div>

                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{productDetails.product.name}</p>
                        <div>
                            <span className="ratingCount">4.3 <IoIosStar /></span>
                            <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                        </div>
                        <div className="extraOffer">Extra <BiRupee />4500 off </div>
                        <div className="flexRow priceContainer">
                            <span className="price"><BiRupee />{productDetails.product.price}</span>
                            <span className="discount" style={{ margin: '10px 10px' }}>22% off</span>
                            <span>i</span>
                        </div>
                        <div>
                            <p style={{
                                color: '#212121',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginTop: '20px'
                            }}>Available Offers</p>
                            <p style={{ display: 'flex' }}>
                                <span style={{
                                    width: '100px',
                                    fontSize: '12px',
                                    color: '#878787',
                                    fontWeight: '600',
                                    marginRight: '20px',
                                    marginTop: '20px'
                                }}>Description</span>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#212121',
                                    marginTop: '20px'
                                }}>{productDetails.product.description}</span>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </Layout>
    )

}

export default ProductDetailsPage