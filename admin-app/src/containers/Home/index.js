import React from 'react'
import Layout from '../../components/layout/Layout'
import { Jumbotron } from 'react-bootstrap';

export default function index() {
    return (
        <div>
            <Layout></Layout>
            <Jumbotron style={{ margin: '5rem', background: 'white' }} className="text-center">
                <h1>Welcome to Admin Dashboard</h1>
            </Jumbotron>
        </div>
    )
}
