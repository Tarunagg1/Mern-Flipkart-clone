import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { login } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';


export default function Signin() {
    const [data, setdata] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()

    const { authenticate } = useSelector(state => state.auth);



    const handelInput = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const userlogin = (e) => {
        e.preventDefault();
        dispatch(login(data))
    }

    if (authenticate) {
        return <Redirect to="/" />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userlogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={data.email} onChange={handelInput} name="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={data.password} onChange={handelInput} name="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
