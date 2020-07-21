export function filterItems(items, filter) {
    if (filter === 'all') {
        return items;
    } else if (filter === 'active') {
        return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
        return items.filter((item) => item.done);
    }
}

export function searchItems(items, search) {
    if (search.length === 0) return items;

    return items.filter((item) => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
}

