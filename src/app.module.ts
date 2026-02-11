import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],      // entities
      synchronize: true,     //  create tables automatically
      logging: true,       // log SQL queries
    }),
  ],
  controllers: [], // controller
  providers: [], // service
})
export class AppModule { }
