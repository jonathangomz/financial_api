import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import databaseConfig from './database.config';

export default ConfigModule.forRoot({
  envFilePath: '.env.local',
  load: [
    databaseConfig,
  ],
  validationSchema: Joi.object({
    DATABASE_URI: Joi.string().required(),
  }),
  isGlobal: true,
});

export {
  databaseConfig,
};