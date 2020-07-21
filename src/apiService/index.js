import axios from 'axios'
import io from 'socket.io-client'

class Api {
    url = {
        GET_TODOS: '/api/todos',
        TODO: '/api/todo/',
        SOCKET: 'http://localhost:3001'
    };

    getItems = () => this.resolveResponse(axios.get(this.url.GET_TODOS));

    addItem = title => this.resolveResponse(axios.post(this.url.TODO, { title }));

    doneItem = id =>  this.resolveResponse(axios.put(this.url.TODO + id));

    removeItem = id => this.resolveResponse(axios.delete(this.url.TODO + id));

    resolveResponse = async (request) => {
        try {
            const {data} = await request;
            return data
        } catch (error) {
            throw new Error(error.response.data.error ? error.response.data.error.message : 'Something went wrong')
        }
    };

    socketConnection = () => io(this.url.SOCKET);
}

export default new Api()