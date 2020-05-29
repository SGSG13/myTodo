import axios from 'axios'

const URL = {
    GET_TODOS: '/api/todos',
    TODO: '/api/todo',
};

export const getItemsFromApi = () => resolveResponse(axios.get(URL.GET_TODOS));
export const addItemFromApi = title => resolveResponse(axios.post(URL.TODO, { title }));
export const doneItemFromApi = id => resolveResponse(axios.put(URL.TODO + `/${id}`));
export const removeItemFromApi = id => resolveResponse(axios.delete(URL.TODO + `/${id}`));

const resolveResponse = async (request) => {
    try {
        const {data} = await request;
      return data
    } catch (error) {
       throw new Error(error.response.data.error.message)
    }
};