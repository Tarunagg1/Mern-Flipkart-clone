import React from 'react'
import Layout from '../../components/Layout'
import { genratePublicUrl } from '../../env';
import './product.css';
import './ProductStore/index';
import ProductStore from './ProductStore';
import getParams from '../../utils/getParams';
import ProductPage from '../productPage';

export default function ProductListpages(props) {

    const renderProduct = ()=>{
        const params = getParams(props.location.search);
        let content = null;
        switch (params.type) {
            case 'store':
                content= <ProductStore {...props} />;
                break;
            case 'page':
                content= <ProductPage {...props} />;
                break
            default:
                content= null;
        }
        return content;
    }


    return (
        <Layout>
             {renderProduct()}
        </Layout>
    )
}
