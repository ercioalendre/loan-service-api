import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/prisma.service';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { AppCrypto } from '@utilities/app-crypto';
import { CreateOneUserController } from '@modules/user/controllers/create-one-user.controller';
import { GetOneUserByIdController } from '@modules/user/controllers/get-one-user-by-id.controller';
import { GetManyUserController } from '@modules/user/controllers/get-many-user.controller';
import { UpdateOneUserByIdController } from '@modules/user/controllers/update-one-user-by-id.controller';
import { DeleteOneUserByIdController } from '@modules/user/controllers/delete-one-user-by-id.controller';
import { CreateOneUserService } from '@modules/user/services/create-one-user.service';
import { GetManyUserService } from '@modules/user/services/get-many-user.service';
import { GetOneUserByIdService } from '@modules/user/services/get-one-user-by-id.service';
import { UpdateOneUserByIdService } from '@modules/user/services/update-one-user-by-id.service';
import { DeleteOneUserByIdService } from '@modules/user/services/delete-one-user-by-id.service';

@Module({
  controllers: [
    CreateOneUserController,
    GetManyUserController,
    GetOneUserByIdController,
    UpdateOneUserByIdController,
    DeleteOneUserByIdController,
  ],
  providers: [
    CreateOneUserService,
    GetManyUserService,
    GetOneUserByIdService,
    UpdateOneUserByIdService,
    DeleteOneUserByIdService,
    UserPrismaRepository,
    PrismaService,
    AppCrypto,
  ],
  exports: [UserPrismaRepository],
})
export class UserModule {}
