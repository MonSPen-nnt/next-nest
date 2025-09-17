import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { Board } from './modules/board/entities/board.entity';
import { BoardMember } from './modules/board_member/entities/board_member.entity';
import { CardLabel } from './modules/card_labels/entities/card_label.entity';
import { CardMember } from './modules/card_members/entities/card_member.entity';
import { Card } from './modules/cards/entities/card.entity';
import { Comment } from './modules/comments/entities/comment.entity';
import { Label } from './modules/labels/entities/label.entity';
import { List } from './modules/lists/entities/list.entity';
import { DataSource } from 'typeorm';
import { BoardMemberModule } from './modules/board_member/board_member.module';
import { BoardModule } from './modules/board/board.module';
import { CardLabelsModule } from './modules/card_labels/card_labels.module';
import { CardMembersModule } from './modules/card_members/card_members.module';
import { CardModule } from './modules/cards/card.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LabelsModule } from './modules/labels/labels.module';
import { ListsModule } from './modules/lists/lists.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        schema: configService.get('DB_SCHEMA'),

        entities: [
          User,
          Board,
          BoardMember,
          List,
          Card,
          Comment,
          Label,
          CardLabel,
          CardMember,
        ],

        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST_MAILER_MODULE'),
          port: configService.get('PORT_MAILER_MODULE'),
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },

        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule,
    BoardMemberModule,
    BoardModule,
    CardLabelsModule,
    CardMembersModule,
    CardModule,
    CommentsModule,
    LabelsModule,
    ListsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
