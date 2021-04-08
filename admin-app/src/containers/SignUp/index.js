import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../components/layout/Layout'
import Input from '../../components/Ui/Input';

export default function index() {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input name="firstname" type="text" placeholder="Enter First name" label="Enter First name" />
                                </Col>
                                <Col md={6}>
                                    <Input name="lastname" type="text" placeholder="Enter Last Name" label="Enter Last Name" />
                                </Col>
                            </Row>
                            <Form.Group controlId="formBasicEmail">
                                <Input name="email" type="email" placeholder="Email addres" label="Email addres" errormsg="We'll never share your email with anyone else" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Input name="password" type="password" placeholder="password" label="password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
