import React, { Component } from 'react';
import AppNavbar from '../NavBar/AppNavbar';
import BooksDataService from "../Config/BooksDataService";
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import * as moment from 'moment'

class BookAddComponent extends Component{

    initialState = {
        book: {
            isbn: null,
            title: '',
            publishedDate: '',
            description: '',
            rating: 0,
            author: {
                bio: '',
                dateOfBirth: '',
                firstName: '',
                lastName: ''
            },
            cover: {
                id: null,
                bookTitle: '',
                link: ''
            }
        },
        isLoading: true
    }
    constructor(props) {
        super(props)
        this.state = {...this.initialState}

    }

    componentDidMount() {
        console.log('in book add')
    }

    onChange = (e) => {

        const value = e.target.value
        const name = e.target.name;
        let book = {...this.state.book};
        if(name === 'title'){
            book.cover.bookTitle = value;
        }
        book[name] = value;
        this.setState({book});

    }

    handleInputAuthor = key => event => {
        const { book } = this.state;

        this.setState({
            book: {
                ...book,
                author:{
                    ...book.author,
                    [key]: event.target.value
                }}
        })

    };

    handleInputCover = key => event => {
        const { book } = this.state;


        this.setState({
            book: {
                ...book,
                cover:{
                    ...book.cover,
                    [key]: event.target.value
                }}
        })


    };

    parseDate(str, format, locale) {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    }

    formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
    }

    handleChangePublishedDate = date =>{
        const newDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
        let book = {...this.state.book};
        book.publishedDate = newDate
        this.setState({book});
    }

    handleChangeDateOfBirth = date =>{
        const newDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
        let book = {...this.state.book};
        book.author.dateOfBirth = newDate
        this.setState({book});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {book} = this.state;
        BooksDataService.addBook(book).then(
            response => {
                this.props.history.push(`/books`)
            }
        )


    }


    render() {
        const {book} = this.state;
        return (
            <div>
                <AppNavbar/>
                <Container fluid={true}>
                    <h1>Add Book Details</h1>

                    <Form onSubmit={this.onSubmit}>

                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" value={book.title}
                                   onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" value={book.description}
                                   onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="publishedDate">Published Date</Label>
                        </FormGroup>
                        <FormGroup>
                            <DayPickerInput

                                format={'dd-MM-yyyy'}
                                onDayChange={this.handleChangePublishedDate}
                                formatDate={this.formatDate}
                                parseDate={this.parseDate}
                                placeholder={`${dateFnsFormat(new Date(), 'dd-MM-yyyy')}`}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input type="number" name="rating" id="rating" value={book.rating}
                                   onChange={this.onChange} />
                        </FormGroup>
                        <h2>Author Details</h2>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" value={book.author.firstName} onChange={this.handleInputAuthor('firstName')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" value={book.author.lastName}
                                   onChange={this.handleInputAuthor('lastName')} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="dateOfBirth">Date of Birth:</Label>
                        </FormGroup>
                        <FormGroup>
                            <DayPickerInput

                                format={'dd-MM-yyyy'}
                                onDayChange={this.handleChangeDateOfBirth}
                                formatDate={this.formatDate}
                                parseDate={this.parseDate}
                                placeholder={`${dateFnsFormat(new Date(), 'dd-MM-yyyy')}`}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="bio">Bio</Label>
                            <Input type="text" name="bio" id="bio" value={book.author.bio}
                                   onChange={this.handleInputAuthor('bio')} />
                        </FormGroup>
                        <h2>Cover Details</h2>
                        <FormGroup>
                            <Label for="link">Cover Link</Label>
                            <Input type="text" name="link" id="link" value={book.cover.link} onChange={this.handleInputCover('link')}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/books">Cancel</Button>
                        </FormGroup>
                    </Form>

                </Container>
            </div>
        )
    }
}
export default BookAddComponent;