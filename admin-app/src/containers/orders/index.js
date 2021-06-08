// import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
// import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Col, Row, } from 'react-bootstrap';


export default function Order() {

    return (
        <>
            <Layout sidebar>
                <Container fluid>
                    <Row>
                        <Col md={12} className="mt-3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Orders</h3>
                                {/* <button data-toggle="modal" onClick={handleShow} data-target="#Category">Add</button> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Layout>

        </>
    )
}
