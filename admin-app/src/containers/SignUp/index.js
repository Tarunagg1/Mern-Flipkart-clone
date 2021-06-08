import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../components/layout/Layout'
import Input from '../../components/Ui/Input';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { signUp } from '../../actions';


export default function Signup() {
    const [data, setdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const dispatch = useDispatch()

    const { authenticate } = useSelector(state => state.auth);


    if (authenticate) {
        return <Redirect to="/" />
    }

    const handelInput = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }

    const handelForm = (e) => {
        e.preventDefault();
        dispatch(signUp(data));
    }


    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={handelForm}>
                            <Row>
                                <Col md={6}>
                                    <Input name="firstname" type="text" placeholder="Enter First name" onChange={handelInput} name="firstname" label="Enter First name" />
                                </Col>
                                <Col md={6}>
                                    <Input name="lastname" type="text" placeholder="Enter Last Name" onChange={handelInput} name="lastname" label="Enter Last Name" />
                                </Col>
                            </Row>
                            
                            <Form.Group controlId="formBasicEmail">
                                <Input name="email" type="email" placeholder="Email addres" onChange={handelInput} name="email" label="Email addres" errormsg="We'll never share your email with anyone else" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Input name="password" type="password" placeholder="password" onChange={handelInput} name="password" label="password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
