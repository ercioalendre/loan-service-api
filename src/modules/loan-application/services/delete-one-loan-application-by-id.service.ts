import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanApplicationPrismaRepository } from '@modules/loan-application/repositories/loan-application.prisma.repository';
import { StaticErrors } from '@static/static-errors';
import { DeleteOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/delete-one-loan-application-output.dto';

@Injectable()
export class DeleteOneLoanApplicationByIdService {
  constructor(
    private readonly loanApplicationPrismaRepository: LoanApplicationPrismaRepository,
  ) {}

  public async execute(id: string): Promise<DeleteOneLoanApplicationOutputDto> {
    const loanApplication =
      await this.loanApplicationPrismaRepository.getOneUnique({ id });

    if (!loanApplication) {
      throw new NotFoundException(
        StaticErrors.THE_LOANAPPLICATION_YOU_ARE_TRYING_TO_DELETE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    return this.loanApplicationPrismaRepository.deleteOneById(id);
  }
}
