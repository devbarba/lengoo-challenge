import fs from 'fs';
import { BAD_REQUEST, PRECONDITION_FAILED } from 'http-status';
import Joi from 'joi';
import path from 'path';

import Handler from '../errors/handler.error';
import IConfig from '../interfaces/configs';

/**
 * autoloadConfig: Auto load configurations.
 * @param base_dir
 * @returns
 */
const autoloadConfig = (base_dir: string): IConfig => {
    const configDir = path.join(base_dir, 'configs');

    if (!fs.existsSync(configDir)) throw 'directory config not exists';

    const configs = fs.readdirSync(configDir);

    const data: any = {};

    configs.forEach((file) => {
        const filename = path.join(configDir, file);
        data[file.split('.')[0]] = require(filename).default;
    });

    return data;
};

/**
 * getEnv: Get passed env.
 * @param key
 * @param alternate
 * @returns
 */
const getEnv = (
    key: string,
    alternate: any,
    required?: boolean
): string | undefined => {
    if (
        required &&
        process.env[key] === undefined &&
        process.env[alternate] === undefined
    )
        throw `missing key: ${key}`;

    if (process.env[key] && process.env[key] !== 'null')
        return process.env[key];

    if (process.env[alternate] && process.env[alternate] !== 'null')
        return process.env[alternate];

    return alternate;
};

/**
 * getDir: Get passed dir.
 * @param folder
 * @returns string
 */
const getDir = (folder = ''): string => path.resolve(__dirname, '../', folder);

/**
 * baseDir: Get the base dir.
 * @param folder
 * @returns string
 */
const getBaseDir = (folder = ''): string => getDir(folder ? `${folder}` : '');

/**
 * getCodes: Return a status code depending the validation error.
 * @param code string
 * @returns number
 */
const getCodes = (code: string): number => {
    const givenCodes = {
        'any.required': PRECONDITION_FAILED,
        'object.unknown': BAD_REQUEST,
    };

    return givenCodes[code] ? givenCodes[code] : BAD_REQUEST;
};

/**
 * verifyFields: Schema verification with Joi.
 * @param requiredFields string[]
 * @param field {}
 * @returns false | string[]
 */
const verifyFields = (
    body: unknown,
    schema: Joi.ObjectSchema<unknown>
): Handler | void => {
    const schemaValidated = schema.validate(body);

    if (schemaValidated.error && schemaValidated.error.details) {
        const field = schemaValidated.error.details[0];

        throw new Handler(
            field.message.replace(/['"]+/g, ''),
            getCodes(field.type)
        );
    }
};

export { autoloadConfig, getEnv, getDir, getBaseDir, verifyFields };
