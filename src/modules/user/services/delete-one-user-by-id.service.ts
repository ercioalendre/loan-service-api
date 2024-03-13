import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { StaticErrors } from '@static/static-errors';
import { DeleteOneUserOutputDto } from '@modules/user/dtos/delete-one-user-output.dto';

@Injectable()
export class DeleteOneUserByIdService {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  public async execute(id: string): Promise<DeleteOneUserOutputDto> {
    const user = await this.userPrismaRepository.getOneUnique({ id });

    if (!user) {
      throw new NotFoundException(
        StaticErrors.THE_USER_YOU_ARE_TRYING_TO_DELETE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    const userHasUserRelation = await this.userPrismaRepository.getOne({
      createdBy: user.id,
    });

    if (userHasUserRelation) {
      throw new BadRequestException(
        StaticErrors.THE_USER_YOU_ARE_TRYING_TO_DELETE_CANNOT_BE_DELETED_BECAUSE_OF_ONE_OR_MORE_EXISTING_USERS_RELATED_TO_IT,
      );
    }

    return this.userPrismaRepository.deleteOneById(id);
  }
}
