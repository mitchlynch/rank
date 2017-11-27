import {expect} from 'chai';
import sinon from 'sinon';
import * as sessionStorage from '../../store/sessionStorage';
import * as windowAccessor from '../../utils/windowAccessor';

const sandbox = sinon.sandbox.create();
let setDataStub;
let getDataStub;

describe('sessionStorage Tests', () => {

    beforeEach(() => {
        setDataStub = sandbox.stub(windowAccessor, 'setItemInStorage');
        getDataStub = sandbox.stub(windowAccessor, 'getItemInStorage');
        sandbox.stub(windowAccessor, 'getWindowSessionStorage');
        sandbox.stub(windowAccessor, 'removeDataInSessionStorage');
        sandbox.stub(windowAccessor, 'clearStorage');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('saving data to session storage', () => {
        describe('when value is an object', () => {
            it('then data set in session storage will be serialized is true', () => {
                let sessionData = {
                    valueAsObject: {
                        testData: 'test'
                    }
                };

                let serializedData = JSON.stringify(sessionData.valueAsObject);
                sessionStorage.setDataInSessionStorage(sessionData);
                expect(setDataStub.calledWithMatch('valueAsObject', serializedData)).to.be.true;
            });

            it('then data set in session storage will be not serialized is false', () => {
                let sessionData = {
                    valueAsObject: {
                        testData: 'test'
                    }
                };
                sessionStorage.setDataInSessionStorage(sessionData);
                expect(setDataStub.calledWithMatch('valueAsObject', sessionData.valueAsObject)).to.be.false;
            });
        });

        describe('when value is not an object', () => {
            it('then data set in session storage will not be serialized is true', () => {
                let sessionData = {
                    valueAsString: 'the value'
                };
                sessionStorage.setDataInSessionStorage(sessionData);

                expect(setDataStub.calledWithMatch('valueAsString', sessionData.valueAsString)).to.be.true;
            });
        });
    });

    describe('when loading from redux state', () => {
        describe('when redux state exists in session storage', () => {
            it('then return the redux state for application binding', () => {
                let valueAsSerializedObject = JSON.stringify({
                    'testData': 'test'
                });

                let deserializedData = {
                    'testData': 'test'
                };
                getDataStub.returns(valueAsSerializedObject);
                let storageData = sessionStorage.loadReduxState();
                expect(storageData).to.deep.equal(deserializedData);
            });
        });

        describe('when redux state does not exist in session storage', () => {
            it('then return undefined for initial application binding', () => {
                getDataStub.returns(undefined);
                let storageData = sessionStorage.loadReduxState();
                expect(storageData).to.be.undefined;
            });
        });
    });

    describe('getting data from session storage', () => {
        describe('when value can be deserialized to an object', () => {
            it('then return the value as an object', () => {
                let valueAsSerializedObject = JSON.stringify({
                    'testData': 'test'
                });

                let deserializedData = {
                    'testData': 'test'
                };
                getDataStub.returns(valueAsSerializedObject);
                let storageData = sessionStorage.getDataFromSessionStorage('valueAsObject');
                expect(storageData).to.deep.equal(deserializedData);
            });
        });

        describe('when value can not be deserialized to an object', () => {
            it('then return the value as it is stored', () => {
                let valueAsString = 'test';

                getDataStub.returns(valueAsString);
                let storageData = sessionStorage.getDataFromSessionStorage('valueAsString');
                expect(storageData).to.equal(valueAsString);
            });
        });
    });

});