import React from 'react'
import Layout from '../../components/layout/Layout'
import './style.css';
import { Container } from 'react-bootstrap';


export default function index() {
    return (
        <div>
            <Layout sidebar>
                <Container fluid>
                    hi
                </Container>
            </Layout>

        </div>
    )
}
