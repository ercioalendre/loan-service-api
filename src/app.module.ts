import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@src/guards/auth.guard';
import { RolesGuard } from '@src/guards/roles.guard';
import { AppCrypto } from '@utilities/app-crypto';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '@modules/database/database.module';
import { LoanApplicationModule } from '@modules/loan-application/loan-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.getOrThrow('RATE_LIMITING_TTL'),
          limit: configService.getOrThrow('RATE_LIMITING_LIMIT'),
        },
      ],
    }),
    AuthModule,
    UserModule,
    LoanApplicationModule,
    DatabaseModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppCrypto,
  ],
  controllers: [],
})
export class AppModule {}
