import { createSelector } from "reselect";
import { searchItems, filterItems } from '../utils'

const itemsSelector = state => state.items;
const searchTitleSelector = state => state.filter.searchTitle;
const statusSelector = state => state.filter.statusFilter;

export const filterSelector = createSelector(
    itemsSelector,
    searchTitleSelector,
    statusSelector,
    (items, searchTitle, statusFilter) => {
        return searchItems(filterItems(items, statusFilter), searchTitle);
    });






