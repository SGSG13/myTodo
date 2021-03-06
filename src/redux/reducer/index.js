import {Constance} from "../constance"

export const initialStore = {
    items: [],
    loading: false,
    error: null,
    filter: {
        searchTitle: '',
        statusFilter: 'all'
    }
};

const reducer = (store = initialStore, action) => {
    const {type, payload, error} = action;
    switch (type) {
        case Constance.LOAD_ITEMS + Constance.REQUEST:
            return Object.assign({...store}, {loading: true});
        case Constance.LOAD_ITEMS + Constance.SUCCESS:
        case Constance.SYNC_ITEMS:
            return Object.assign({...store}, { items: payload.items, loading: false, error: null });
        case Constance.RESPONSE_FAIL:
            return Object.assign({...store}, { error, loading: false });
        case Constance.CHANGE_SEARCH:
            return Object.assign({...store}, { filter: Object.assign({...store.filter}, {searchTitle: payload.searchTitle })});
        case Constance.CHANGE_STATUS:
            return Object.assign({...store}, { filter: Object.assign({...store.filter}, {statusFilter: payload.statusFilter })});
        default:
            return store;
    }
};

export default reducer