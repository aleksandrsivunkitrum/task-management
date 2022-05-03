const key = '_tm__tickets';

function getItems(){
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
}

function setItems(items){
    localStorage.setItem(key, JSON.stringify(items));
}

export async function get(){
    return getItems();
}

export async function post(item){
    const items = getItems();
    items.push(item);
    setItems(items);
    return item;
}

export async function update(toUpdate){
    const items = getItems();

    let out = {};
    const newItems = items.map(item => {
        if (item.id === toUpdate.id){
            return out = {...item, ...toUpdate}
        }else{
            return item
        }
    })

    setItems(newItems);
    return out;
}

export async function deleteItem(toDelete){
    const items = getItems();

    const newItems = items.filter(item => {
        return item.id !== toDelete.id
    })

    setItems(newItems);
    return toDelete;
}

export function deleteItemByList(toDelete){
    const items = getItems();

    const newItems = items.filter(item => {
        return item.listId !== toDelete.id
    })

    setItems(newItems);
}
