import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

const buildObjectStateFromArray = (array) => {
    let objectState = {};
    array.forEach((data) => {
        let id = data.id;
        objectState[id] = data;
    });

    return objectState;
};

const getClonedState = (state) => {
    return cloneDeep(state);
};

const mergePayload = (state, payload) => {

    let clonedState = getClonedState(state);

    if (payload && payload.id) {

        const id = payload.id;
        clonedState[id] = Object.assign({}, clonedState[id], payload);
    }

    return clonedState;
};

const mergeCorrelatedPayloadDeep = (state, payload) => {

    let clonedState = getClonedState(state);

    if (payload && payload.parentId) {

        const id = payload.parentId;

        clonedState[id] = merge({}, clonedState[id], payload);

    }

    return clonedState;
};

const mergePayloadDeep = (state, payload) => {

    let clonedState = getClonedState(state);

    if (payload && payload.id) {

        const id = payload.id;

        clonedState[id] = merge({}, clonedState[id], payload);

    }

    return clonedState;
};

const mergePayloadFlat = (state, payload) => {

    let clonedState = getClonedState(state);

    if (payload) {
        clonedState = Object.assign({}, clonedState, payload);
    }

    return clonedState;
};

export {buildObjectStateFromArray, getClonedState, mergePayload, mergePayloadDeep, mergeCorrelatedPayloadDeep, mergePayloadFlat};