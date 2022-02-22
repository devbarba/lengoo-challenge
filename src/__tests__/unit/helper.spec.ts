import IConfig from '@interfaces/configs';
import {
    autoloadConfig,
    getEnv,
    getDir,
    getBaseDir,
    verifyFields,
} from '@utils/helper';
import * as dotenv from 'dotenv-safe';
import Joi from 'joi';

import {
    defaultPayload,
    validationResponses,
    missingKeysPayload,
} from '../__mocks__/payloads.mock';

describe('Testing helper functions', () => {
    beforeAll(() => {
        dotenv.config();
    });

    describe('handling getDir()', () => {
        test('expect return dir with getDir()', () => {
            expect(getDir('/')).toBe('/');
            expect.assertions(1);
        });
    });

    describe('handling getBaseDir()', () => {
        test('expect return dir with getBaseDir()', () => {
            expect(getBaseDir('/')).toBe('/');
            expect.assertions(1);
        });

        test('expect return base dir using getDir() and getBaseDir()', () => {
            expect(getBaseDir(getDir())).toBe(getBaseDir(getDir()));
            expect.assertions(1);
        });
    });

    describe('handling getEnv()', () => {
        test('expect return NODE_ENV value', () => {
            expect(getEnv('NODE_ENV', 'local')).toBe('test');
            expect.assertions(1);
        });

        test('expect return NODE_ENV value = "test" because alternative NODE_ENV1 does not exists', () => {
            expect(getEnv('NODE_ENV1', 'NODE_ENV')).toBe('test');
            expect.assertions(1);
        });

        test('expect return alternate NON_EXISTENT value', () => {
            expect(getEnv('NON_EXISTENT', 'alternate_non_existent')).toBe(
                'alternate_non_existent'
            );
            expect.assertions(1);
        });

        test('expect return missing env: MONGO_TEST', () => {
            expect(() => getEnv('MONGO_TEST', '', true)).toThrow(
                'missing key: MONGO_TEST'
            );
            expect.assertions(1);
        });
    });

    describe('handling autoloadConfig()', () => {
        test('expect load all envs with autoloadConfig()', () => {
            expect(autoloadConfig(getBaseDir())).toMatchObject(
                {} as typeof IConfig
            );
            expect.assertions(1);
        });

        test('expect throw error whentry to load envs with autoloadConfig()', () => {
            expect(() => autoloadConfig(getBaseDir('/non-existent'))).toThrow(
                'directory config not exists'
            );
            expect.assertions(1);
        });
    });

    describe('handling verifyFields()', () => {
        const joiSchema = Joi.array()
            .items(
                Joi.object({
                    source: Joi.string().required(),
                    target: Joi.string().required(),
                    sourceLanguage: Joi.string().min(2).max(2).required(),
                    targetLanguage: Joi.string().min(2).max(2).required(),
                }).required()
            )
            .required();

        test('expect to return value must be an array when call verifyFields()', () => {
            expect(() =>
                verifyFields(missingKeysPayload, joiSchema)
            ).toThrowError(`value ${validationResponses[4]}`);
            expect.assertions(1);
        });

        test('expect to return value must be a string when call verifyFields()', () => {
            expect(() =>
                verifyFields([{ ...missingKeysPayload, source: 1 }], joiSchema)
            ).toThrowError(`[0].source ${validationResponses[2]}`);
            expect.assertions(1);
        });

        test('expect to return value must be a string when call verifyFields()', () => {
            expect(() =>
                verifyFields([{ ...missingKeysPayload, target: 1 }], joiSchema)
            ).toThrowError(`[0].target ${validationResponses[2]}`);
            expect.assertions(1);
        });

        test('expect to return missing fields when call verifyFields()', () => {
            expect(() =>
                verifyFields([missingKeysPayload], joiSchema)
            ).toThrowError(`target ${validationResponses[1]}`);
            expect.assertions(1);
        });

        test('expect to return extra fields when call verifyFields()', () => {
            expect(() =>
                verifyFields([{ ...defaultPayload, testing: true }], joiSchema)
            ).toThrowError(`testing ${validationResponses[0]}`);
            expect.assertions(1);
        });

        test('expect to return void when call verifyFields()', () => {
            expect(verifyFields([defaultPayload], joiSchema)).toBeFalsy();
            expect.assertions(1);
        });

        test('expect to return validation error when call verifyFields() cause invalid field value: targetLanguage', () => {
            expect(() =>
                verifyFields(
                    [{ ...defaultPayload, targetLanguage: 'abc' }],
                    joiSchema
                )
            ).toThrowError(`[0].targetLanguage ${validationResponses[3]}`);
            expect.assertions(1);
        });

        test('expect to return validation error when call verifyFields() cause invalid field value: sourceLanguage', () => {
            expect(() =>
                verifyFields(
                    [{ ...defaultPayload, sourceLanguage: 'abc' }],
                    joiSchema
                )
            ).toThrowError(`[0].sourceLanguage ${validationResponses[3]}`);
            expect.assertions(1);
        });
    });
});
