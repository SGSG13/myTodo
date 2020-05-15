import axios from 'axios'

const URL = {
    GET_TODOS: '/api/todos',
    TODO: '/api/todo',
};

export const getItemsFromApi = () => axios.get(URL.GET_TODOS);
export const addItemFromApi = title => axios.post(URL.TODO, { title });
export const doneItemFromApi = id => axios.put(URL.TODO + `/${id}`);
export const removeItemFromApi = id => axios.delete(URL.TODO + `/${id}`);