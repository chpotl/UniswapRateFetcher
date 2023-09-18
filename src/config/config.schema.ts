import * as Joi from 'joi';

export type ConfigSchema = {
  APP_PORT: number;
  TTL: number;
  MAX_POOLS: number;
};

export const configValidationSchema = Joi.object<ConfigSchema>({
  APP_PORT: Joi.number().default(3001),
  TTL: Joi.number().required(),
  MAX_POOLS: Joi.number().default(25),
});
