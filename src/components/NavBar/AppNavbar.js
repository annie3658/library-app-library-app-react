import React, { Component } from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

class AppNavbar extends Component{

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return<Navbar color="dark" expand="md">
            <NavbarBrand tag={Link} style={{ color: '#A9A9A9' }} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar={true}>
                <Nav className="ml-auto" navbar={true}>
                    <NavItem>
                        <NavLink style={{ color: '#A9A9A9' }}
                                 href="https://twitter.com/joonietehpooh">@joonietehpooh</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: '#A9A9A9' }} href="https://github.com/annie3658">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
export default AppNavbar;