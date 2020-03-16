import {Constance} from './constance'

export function getItemsAction() {
    return {
        type: Constance.LOAD_ITEMS + Constance.REQUEST
    }
}

export function addItemAction(title) {
    return {
        type: Constance.ADD_ITEM,
        payload: {title}
    }
}

export function doneItemAction(id) {
    return {
        type: Constance.DONE_ITEM + Constance.REQUEST,
        payload: {id}
    }
}

export function removeItemAction(id) {
    return {
        type: Constance.REMOVE_ITEM + Constance.REQUEST,
        payload: {id}
    }
}

export function changeSearchAction(searchTitle) {
    return {
        type: Constance.CHANGE_SEARCH,
        payload: {searchTitle}
    }
}

export function changeStatusAction(statusFilter) {
    return {
        type: Constance.CHANGE_STATUS,
        payload: {statusFilter}
    }
}