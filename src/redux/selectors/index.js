import { createSelector } from "reselect";
import { searchItems, filterItems } from '../../utils'

export const itemsSelector = state => state.items;
export const searchTitleSelector = state => state.filter.searchTitle;
export const statusSelector = state => state.filter.statusFilter;
export const loadingSelector = state => state.loading;
export const errorSelector = state => state.error;

export const filterSelector = createSelector(
    itemsSelector,
    searchTitleSelector,
    statusSelector,
    (items, searchTitle, statusFilter) => {
        return searchItems(filterItems(items, statusFilter), searchTitle);
    });






