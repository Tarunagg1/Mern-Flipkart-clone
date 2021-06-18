import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';
import Layout from '../../components/layout/Layout'
import Newmodal from '../../components/Modal';
import Input from '../../components/Ui/Input';
import CreateCategoryList from '../../helpers/CreateCategoryList';

export default function Page() {

    const [Createmodal, setCreatemodal] = useState(false);
    const [Title, setTitle] = useState(null);
    const { categories } = useSelector(state => state.category);
    const [CategoriesList, setCategoriesList] = useState([]);
    const [CategoryId, setCategoryId] = useState(null);
    const [Desc, setDesc] = useState(null);
    const [Type, setType] = useState(null);
    const [benners, setbenners] = useState([]);
    const [products, setProducts] = useState([]);

    const page = useSelector(state => state.page);

    const dispatch = useDispatch();


    useEffect(() => {
        setCategoriesList(CreateCategoryList(categories));
    }, [categories])

    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setCreatemodal(false)
            setTitle(null);
            setCategoryId(null)
            setDesc(null);
            setType(null)
            setbenners([]);
            setProducts([]);
        }
    }, [page])

    const handelBannersImages = (e) => {
        console.log([...benners, e.target.files[0]]);
        setbenners([...benners, e.target.files[0]]);
    }

    const handelProductsImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const oncategoryChange = (e) => {
        const c = CategoriesList.filter(ca => ca.value === e.target.value)
        setCategoryId(e.target.value);
        // console.log(c[0]);
        if (c[0].type) {
            setType(c[0].type);
        } else {
            setType("undefined")
        }
    }

    const submitForm = (e) => {

        if (Title === "") {
            alert("Title required");
            setCreatemodal(false);
        }
        const form = new FormData();
        form.append('title', Title);
        form.append('description', Desc);
        form.append('type', Type);
        form.append('category', CategoryId);

        benners.forEach((bann) => {
            console.log(bann);
            form.append('banners', bann);
        })

        products.forEach((prod) => {
            form.append('products', prod);
        })

        // console.log({Title,Desc,Type,CategoryId,benners,products});
        dispatch(createPage(form))
    }

    const renderCreatePageModal = () => {
        return (
            <Newmodal
                show={Createmodal}
                modalTitle="Create New Page"
                handleClose={() => setCreatemodal(false)}
                onSubmit={submitForm}
            >
                <Container>
                    <Row>
                        <Col>
                            <select name="category" value={CategoryId} id="category" className="form-control" onChange={oncategoryChange} >
                                <option value="koij">--Select Category--</option>
                                {
                                    CategoriesList.map((option, ind) => (
                                        <option key={ind} value={option.value} >{option.name}</option>
                                    ))
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="text" value={Title} name="title" className="form-control" placeholder="Page Title" onChange={(e) => setTitle(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="text" value={Desc} className="form-control" placeholder="Page Description" onChange={(e) => setDesc(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            benners.lenght > 0 ?
                                benners.map((b, ind) => (
                                    <Row key={ind}>
                                        <Col>j</Col>
                                    </Row>
                                )) : null
                        }
                        <Col>
                            <input type="file" multiple className="form-control mt-3" name="bannersimg" onChange={handelBannersImages} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.lenght > 0 ?
                                products.map((produ, ind) => (
                                    <Row key={ind}>
                                        <Col>{produ.name}</Col>
                                    </Row>
                                )) : null
                        }
                        <Col>
                            <input type="file" multiple className="form-control mt-3" name="productsimages" onChange={handelProductsImages} />
                        </Col>
                    </Row>
                </Container>
            </Newmodal>
        )
    }

    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>createing page....wait...</p>
                    :
                    <>
                        <button onClick={() => setCreatemodal(true)}>Click</button>
                        {renderCreatePageModal()}
                    </>
            }
        </Layout>
    )
}
