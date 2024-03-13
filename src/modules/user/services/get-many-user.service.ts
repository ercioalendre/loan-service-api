import { Injectable } from '@nestjs/common';
import { AppCrypto } from '@utilities/app-crypto';
import { StaticKeys } from '@static/static-keys';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { GetManyUserOutputDto } from '@modules/user/dtos/get-many-user-output.dto';
import { SearchParams } from '@src/types/search-params.type';

@Injectable()
export class GetManyUserService {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly appCrypto: AppCrypto,
  ) {}

  public async execute(
    searchParams?: SearchParams | null,
  ): Promise<GetManyUserOutputDto> {
    const userList = await this.userPrismaRepository.getMany(searchParams);

    const decryptedUserList = [];

    for (const encryptedUser of userList.data) {
      const decryptedUser = this.appCrypto.decryptData(
        encryptedUser,
        StaticKeys.USER_ENCRYPTION_KEYS,
      );

      decryptedUserList.push(decryptedUser);
    }

    return {
      ...userList,
      data: decryptedUserList,
    };
  }
}
