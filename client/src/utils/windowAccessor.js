const getWindowLocationHost = () => {
    return window.location.host;
};

const getWindowLocationProtocol = () => {
    return window.location.protocol;
};

const getWindowSessionStorage = () => {
    return window.sessionStorage;
};

const setItemInStorage = (key, value) => {
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
    }
};

const getItemInStorage = (key) => {
    if (window.sessionStorage) {
        return window.sessionStorage.getItem(key);
    }
};

const removeDataInSessionStorage = (key) => {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem(key);
    }
};

const clearStorage = () => {
    if (window.sessionStorage) {
        window.sessionStorage.clear();
    }
};

const setDataOnWindow = (key, data) => {
    window[key] = data;
};

const initializeHeapProperties = (props) => {
    if (window.heap) {
        window.heap.addUserProperties(props);
    }
};

const getHeapUserId = () => {
    let heapId;
    if (window.heap) {
        heapId = window.heap.userId;
    }
    return heapId;
};

const trackHeapEvent = (eventName, eventProperties) => {
    if(window.heap) {
        window.heap.track(eventName, eventProperties);
    }
};

export {
    clearStorage,
    getHeapUserId,
    getItemInStorage,
    getWindowLocationHost,
    getWindowLocationProtocol,
    getWindowSessionStorage,
    initializeHeapProperties,
    removeDataInSessionStorage,
    setDataOnWindow,
    setItemInStorage,
    trackHeapEvent
};