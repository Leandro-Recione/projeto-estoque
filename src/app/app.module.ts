import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from '../produto/produto.module.js';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { FornecedorModule } from '../fornecedor/fornecedor.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mariadb'>('DB_TYPE', 'mariadb'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

  ProdutoModule,
FornecedorModule ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}