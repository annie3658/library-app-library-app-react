import axios from 'axios'

const API_URL = 'http://localhost:8080/api'
class BooksDataService {
    retrieveAllBooks() {
        return axios.get(`${API_URL}/books`);
    }

    deleteBookById(id){
        return axios.delete(`${API_URL}/book/${id}`)
    }

    retrieveBook(id) {
        console.log('in retrieve')
        return axios.get(`${API_URL}/book/${id}`);
    }

    updateBook(id, book){
        return axios.put(`${API_URL}/book/${id}`, book)
    }

    addBook(book){
        console.log('in add book')
        return axios.post(`${API_URL}/book`, book)
    }
}
export default new BooksDataService()