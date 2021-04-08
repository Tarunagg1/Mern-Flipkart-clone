import React from 'react'
import { Form } from 'react-bootstrap'

export default function Tnpu(props) {
    return (
        <Form.Group controlId="formBasicEmail">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control name={props.name} onChange={props.onChange} type={props.type} placeholder={props.placeholder} />
            <span>+{props.errormsg}</span>
        </Form.Group>
    )
}
