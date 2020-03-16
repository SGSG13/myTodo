import axios from 'axios'

const URL = {
    GET_ITEMS: '/api/get',
    ADD_ITEM: '/api/add',
    DONE_ITEM: '/api/done',
    REMOVE_ITEM: '/api/remove',
};

export const getItemsFromApi = () => axios.get(URL.GET_ITEMS);
export const addItemFromApi = title => axios.post(URL.ADD_ITEM, {title});
export const doneItemFromApi = id => axios.post(URL.DONE_ITEM, {id});
export const removeItemFromApi = id => axios.post(URL.REMOVE_ITEM, {id});