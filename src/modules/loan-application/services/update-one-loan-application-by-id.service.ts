import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanApplicationPrismaRepository } from '@modules/loan-application/repositories/loan-application.prisma.repository';
import { StaticErrors } from '@static/static-errors';
import { UpdateOneLoanApplicationInputDto } from '@modules/loan-application/dtos/update-one-loan-application-input.dto';
import { LoanApplicationBaseOutputDto } from '@modules/loan-application/dtos/loan-application-base-output.dto';
import { UpdateOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/update-one-loan-application-output.dto';

@Injectable()
export class UpdateOneLoanApplicationByIdService {
  constructor(
    private readonly loanApplicationPrismaRepository: LoanApplicationPrismaRepository,
  ) {}

  public async execute(
    id: string,
    updateOneLoanApplicationInputDto: UpdateOneLoanApplicationInputDto,
    sessionUser: LoanApplicationBaseOutputDto,
  ): Promise<UpdateOneLoanApplicationOutputDto> {
    const LoanApplicationExists =
      await this.loanApplicationPrismaRepository.getOneUnique({ id });

    if (!LoanApplicationExists) {
      throw new NotFoundException(
        StaticErrors.THE_LOANAPPLICATION_YOU_ARE_TRYING_TO_UPDATE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    const updatedLoanApplicationModel = {
      ...updateOneLoanApplicationInputDto,
      updatedAt: new Date(),
      updatedBy: sessionUser?.id,
    };

    return await this.loanApplicationPrismaRepository.updateOneById(
      id,
      updatedLoanApplicationModel,
    );
  }
}
