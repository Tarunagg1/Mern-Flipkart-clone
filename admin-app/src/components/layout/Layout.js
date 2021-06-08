import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Header from '../header/Header'
import {NavLink} from 'react-router-dom';
import './style.css';

export default function Layout(props) {
    return (
        <>
            <Header />
            {
                props.sidebar ? (
                    <Row>
                        <Col md={2} style={{backgroundColor:"lightgreen"}}  className="sidebar">

                            <ul style={{marginTop:"5rem"}}>
                            <li><NavLink to="/" >Home</NavLink></li>
                                <li><NavLink to="/products" >Products </NavLink></li>
                                <li><NavLink to="/orders" >Orders </NavLink></li>
                                <li><NavLink to="/category" >Category </NavLink></li>
                            </ul>
                        </Col>
                        <Col md={10} style={{marginLeft:'auto'}} className="containermain">{props.children}</Col>
                    </Row>
                ): (
                    props.children
                )
            }
        </>
    )
}
