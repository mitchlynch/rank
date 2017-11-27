import {
    getWindowSessionStorage,
    setItemInStorage,
    getItemInStorage,
    removeDataInSessionStorage,
    clearStorage
} from '../utils/windowAccessor';

const _getType = (elem) => {
    return Object.prototype.toString.call(elem);
};

const _serializeData = (keyValue) => {
    if (_getType(keyValue) === '[object Object]') {
        keyValue = JSON.stringify(keyValue);
    }

    return keyValue;
};

const _deserializeData = (keyValue) => {
    let deserializedData;
    try {
        deserializedData = JSON.parse(keyValue);
    } catch (e) {
        deserializedData = undefined;
    }

    return deserializedData;
};

const _setDataInSessionStorage = (key, value) => {
    setItemInStorage(key, value);
};

const loadReduxState = () => {
    const serializedData = getItemInStorage('reduxState');
    if (!serializedData) {
        return undefined;
    } else {
        return _deserializeData(serializedData);
    }
};

const getDataFromSessionStorage = (key) => {
    let keyValue = getItemInStorage(key);
    return _deserializeData(keyValue) || keyValue;
};

const getAllDataFromSessionStorage = () => {
    return getWindowSessionStorage();
};

const setDataInSessionStorage = (data) => {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let keyValue = data[key];
            _setDataInSessionStorage(key, _serializeData(keyValue));
        }
    }
};

const removeSessionData = (key) => {
    removeDataInSessionStorage(key);
};

const clearSessionStorage = () => {
    clearStorage();
};

export {
    loadReduxState,
    setDataInSessionStorage,
    getDataFromSessionStorage,
    getAllDataFromSessionStorage,
    clearSessionStorage,
    removeSessionData
};