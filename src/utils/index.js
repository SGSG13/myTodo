export function toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = {...arr[idx], [propName]: value};
    return [
        ...arr.slice(0, idx),
        item,
        ...arr.slice(idx + 1)
    ];
}

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

export function normalizedData(items) {
    if (!items || items.length < 1) return [];
    return items.map(item => {
        item['id'] = item['_id'];
        delete item['_id'];
        delete item['__v'];

        return item;
    })
}