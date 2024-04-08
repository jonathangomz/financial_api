import { Module } from '@nestjs/common';
import ConfigModule from './configuration/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './controllers/accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri')
      }),
      inject: [ConfigService]
    }),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
