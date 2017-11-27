import {expect} from 'chai';
import {mergePayload, mergePayloadDeep, mergePayloadFlat} from '../normalizedStateOperations';

describe('normalizedStateOperations Tests', () => {

    const idOne = 'myIdOne';
    const idTwo = 'myIdTwo';

    const idOneState = {
        hey: {
            you: 'guys'
        }
    };

    const idTwoState = {
        bases: {
            are: 'us'
        }
    };

    const state = {
        [idOne]: idOneState,
        [idTwo]: idTwoState
    };

    describe('When merging a payload', () => {

        describe('and no payload exists', () => {

            it('then unmodified cloned state is returned', () => {

                const actual = mergePayload(state, undefined);

                expect(actual).to.deep.equal(state);
                expect(actual[idOne].hey).to.not.equal(state[idOne].hey);
                expect(actual[idTwo].bases).to.not.equal(state[idTwo].bases);
            });
        });

        describe('and no payload id exists', () => {

            it('then unmodified cloned state is returned', () => {

                const payload = {my: 'payload'};
                const actual = mergePayload(state, payload);

                expect(actual).to.deep.equal(state);
                expect(actual[idOne].hey).to.not.equal(state[idOne].hey);
                expect(actual[idTwo].bases).to.not.equal(state[idTwo].bases);
            });
        });

        describe('and a payload id exists', () => {

            let payload;

            beforeEach(() => {
                payload = {};
            });

            describe('and the id does not match an existing id', () => {

                it('then a new cloned object is created associated with the id', () => {
                    payload.id = 'newId';
                    const actual = mergePayload(state, payload);

                    expect(actual.newId).to.not.equal(payload);
                    expect(actual.newId).to.deep.equal(payload);
                });

                it('then existing objects remain unchanged', () => {
                    payload.id = 'newId';
                    const actual = mergePayload(state, payload);

                    expect(actual[idOne]).to.deep.equal(idOneState);
                    expect(actual[idTwo]).to.deep.equal(idTwoState);
                });
            });

            describe('and the id matchs an existing id', () => {

                describe('and the payload contains new top level data', () => {

                    it('then the existing object is cloned and update with new data', () => {
                        payload.id = idOne;
                        payload.another = 'field';

                        const actual = mergePayload(state, payload);
                        const expected = {
                            id: idOne,
                            hey: {
                                you: 'guys'
                            },
                            another: 'field'
                        };

                        expect(actual[idOne]).to.deep.equal(expected);
                        expect(actual[idOne].hey).to.not.equal(idOneState.hey);
                    });
                });

                describe('and the payload contains new nested data', () => {

                    it('then the existing object is cloned and nested data is replaced with new data', () => {
                        payload.id = idOne;
                        payload.hey = {
                            how: 'areYou'
                        };

                        const actual = mergePayload(state, payload);
                        const expected = {
                            id: idOne,
                            hey: {
                                how: 'areYou'
                            },
                        };

                        expect(actual[idOne]).to.deep.equal(expected);
                        expect(actual[idOne].hey).to.not.equal(idOneState.hey);
                    });
                });

                describe('and the payload contains an update to existing data', () => {

                    it('then the existing object is cloned and updated with the data', () => {
                        payload.id = idTwo;
                        payload.bases = {
                            are: 'notUs'
                        };

                        const actual = mergePayload(state, payload);
                        const expected = {
                            id: idTwo,
                            bases: {
                                are: 'notUs'
                            }
                        };

                        expect(actual[idTwo]).to.deep.equal(expected);
                    });
                });

                describe('and the payload does not contain validation errors', () => {

                    describe('and the existing state contains validation errors for the current payload', () => {

                        it('then the validation error is deleted from existing state', () => {
                            let state = {
                              '123': {
                                  aField: 'someData',
                                  anotherField: 'invalidData'
                              }
                            };
                            let payload = {
                                id: '123',
                                anotherField: 'validData'
                            };

                            const actual = mergePayloadDeep(state, payload);
                            const expected = {
                                '123': {
                                    id: '123',
                                    aField: 'someData',
                                    anotherField: 'validData'
                                }
                            };

                            expect(actual).to.deep.equal(expected);
                        });

                    });

                });

            });

            describe('and the payload is not associated with an object ', () => {

                it('then new data is set at the root level', () => {
                    let state = {
                        '123': {
                            aField: 'someData'
                        }
                    };
                    let payload = {
                        flatField: 'flatData'
                    };

                    const actual = mergePayloadFlat(state, payload);
                    const expected = {
                        '123': {
                            aField: 'someData'
                        },
                        flatField: 'flatData'
                    };

                    expect(actual).to.deep.equal(expected);
                });
            });
        });
    });
});
