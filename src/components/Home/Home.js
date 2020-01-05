import React, { Component } from 'react';
import AppNavbar from '../NavBar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid={true}>
                    <Button color="link"><Link to="/books" style={{color: '#1E90FF'}}>Manage your books</Link></Button>
                </Container>

            </div>
        );
    }
}

export default Home;