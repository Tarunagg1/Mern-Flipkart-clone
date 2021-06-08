import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions';

export default function Header() {

    const { authenticate } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signOut());
    }

    return (
        <>
            <Navbar collapseOnSelect style={{ zIndex: 1 }} expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Link to="/">
                        <a class="navbar-brand">E-commerce Admin Dashbord</a>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            {
                                authenticate ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="#" onClick={logout} >Logout</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                                        </li>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
