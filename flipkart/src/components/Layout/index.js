import React from 'react'
import MenuHeader from '../../container/Menuheader'
import Header from '../header'

export default function Layout(props) {
    return (
        <>
            <Header /> 
            <MenuHeader />
              {props.children}
        </>
    )
}
