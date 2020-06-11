import axios from 'axios'
import io from 'socket.io-client'

class Api {
    url = {
        GET_TODOS: '/api/todos',
        TODO: '/api/todo/',
        SOCKET: 'http://localhost:3001'
    };

    getItemsFromApi = () => this.resolveResponse(axios.get(this.url.GET_TODOS));

    addItemFromApi = title => this.resolveResponse(axios.post(this.url.TODO, { title }));

    doneItemFromApi = id => this.resolveResponse(axios.put(this.TODO + id));

    removeItemFromApi = id => this.resolveResponse(axios.delete(this.url.TODO + id));

    resolveResponse = async (request) => {
        try {
            const {data} = await request;
            return data
        } catch (error) {
            throw new Error(error.response.data.error.message)
        }
    };

    socketConnection = () => io(this.url.SOCKET);
}

export default new Api()