import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../header/Header'

export default function Layout(props) {
    return (
        <>
            <Header />
            <Container>
                {props.children}
            </Container>
        </>
    )
}
