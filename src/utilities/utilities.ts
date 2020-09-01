export function clearObject(object) {
    let newObj = { ...object };

    for (let key in newObj) {
        if (newObj.hasOwnProperty(key) && !object[key]) {
            delete newObj[key];
        }
    }
    return newObj;
}