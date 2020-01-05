import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../NavBar/AppNavbar';
import BooksDataService from "../Config/BooksDataService";

class BooksList extends Component{

    constructor(props) {
        super(props);
        this.state = {books: [], isLoading: true};
        this.removeBook = this.removeBook.bind(this);
        this.updateBookClicked = this.updateBookClicked.bind(this)
        this.addBookClicked = this.addBookClicked.bind(this)
    }

    componentDidMount = () => {
        this.refreshBooks();
    }

    refreshBooks(){
        BooksDataService.retrieveAllBooks()
            .then(
                response => {
                    this.setState({books: response.data, isLoading: false})
                }
            )
    }

    removeBook(id){
        BooksDataService.deleteBookById(id)
            .then(
                response => {
                    this.refreshBooks()
                }

            )
    }

    updateBookClicked(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push(`/books/${id}`)
    }


    addBookClicked() {
        window.localStorage.removeItem("userId");
        this.props.history.push(`/new`)
    }

    render() {
        const {books, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const booksList = books.map(book => {

            return <tr key={book.isbn}>
                <td style={{whiteSpace: 'nowrap'}}>{book.title}</td>
                <td>{book.author.firstName} {book.author.lastName}</td>
                <td>{book.description}</td>
                <td>{book.publishedDate}</td>
                <td>{book.rating}</td>
                {book.cover === null ? <td>N/A</td> : <td>{book.cover.link}</td>}
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" style={{ marginRight: 10}} onClick={() => this.updateBookClicked(book.isbn)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.removeBook(book.isbn)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid={true}>
                    <div className="float-right">
                        <Button color="success" onClick={this.addBookClicked}>Add Book</Button>
                    </div>
                    <h3>My Books</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Published date</th>
                            <th>Rating</th>
                            <th>Cover</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {booksList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }


}
export default BooksList;