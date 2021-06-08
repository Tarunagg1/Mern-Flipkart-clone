import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Ui/Input';
import { AddProducts } from '../../actions/product.action';
import Newmodal from '../Modal';


export default function Products() {
    const dispatch = useDispatch();

    const { categories } = useSelector(state => state.category);
    const { products } = useSelector(state => state.product);

    const [show, setShow] = useState(false);



    const handleShow = () => setShow(true);
    const [ProductImage, setProductImage] = useState([])

    const [Productdetails, setProductdetails] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "",
        description: ""
    })


    const CreateCategoryList = (categories,options = [])=>{
        if(categories){
            for(let category of categories){
                options.push({value:category._id,name:category.name});

                if(category.children.length > 0){
                    CreateCategoryList(category.children,options);
                }

            }
            return options
        }
    }

    const handleClose = () => {
        console.log(Productdetails);
        var formData = new FormData();
        formData.append('name', Productdetails.name);
        formData.append('price', Productdetails.price);
        formData.append('category', Productdetails.category);
        formData.append('quantity', Productdetails.quantity);
        formData.append('description', Productdetails.description);

        for (let pic of ProductImage) {
            formData.append('productPicture', pic)
        }
        dispatch(AddProducts(formData));
        console.log('iju');
        setShow(false);
    };

    const handelChange = (e) => {
        setProductdetails({ ...Productdetails, [e.target.name]: e.target.value });
    }

    const handelProductImage = (e) => {
        setProductImage([...ProductImage, e.target.files[0]]);
    }

    const renderProducts = () => {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Product Pictures</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ?
                            products.map((prod,ind) =>
                                <tr key={ind}>
                                    <td>{ind+1}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.quantity}</td>
                                    <td>{prod.description}</td>
                                    <td>1</td>
                                    <td>{prod.category.name}</td>
                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        );
    }

    return (
        <>
            <Layout sidebar>
                <Container fluid>
                    <Row>
                        <Col md={12} className="mt-3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Products</h3>
                                <button data-toggle="modal" onClick={handleShow} data-target="#Category">Add</button>
                            </div>
                        </Col>
                    </Row>
                    <Container>
                        <Row>
                            <Col md={12}>
                                {
                                    renderProducts()
                                }
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Layout>

            <Newmodal
                handleClose={handleClose}
                modalTitle="Add Product"
                show={show}
            >
                <Input type="text" onChange={handelChange} value={Productdetails.name} placeholder="Enter Category name" id="name" name="name" label="Enter Product name" />
                <Input type="number" onChange={handelChange} value={Productdetails.price} placeholder="Enter Product price" name="price" id="price" label="Enter Product Price" />
                <Input type="text" onChange={handelChange} value={Productdetails.quantity} placeholder="Enter Product Quantity" id="quantity" name="quantity" label="Enter Product quantity" />

                <select name="category" id="category" className="form-control" onChange={handelChange} >
                    <option value="0">--Select Category--</option>
                    {
                        CreateCategoryList(categories).map((option, i) => (
                            <option key={i} value={option.value} >{option.name}</option>
                        ))
                    }
                </select>

                <div class="form-group mt-2">
                    <label class="form-label" htmlFor="desc">Enter Product Description</label>
                    <textarea rows="5" name="description" onChange={handelChange} placeholder="Enter Product Description" id="description" class="form-control"></textarea>
                </div>

                {
                    ProductImage.length > 0 ?
                        ProductImage.map((pic, ind) => <div key={ind}> {pic.name} </div>) : ""
                }

                <input type="file" multiple className="form-control mt-3" name="productprice" onChange={handelProductImage} />
            </Newmodal>
        </>
    )
}
