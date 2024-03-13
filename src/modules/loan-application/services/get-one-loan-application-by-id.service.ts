import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanApplicationPrismaRepository } from '@modules/loan-application/repositories/loan-application.prisma.repository';
import { GetOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/get-one-loan-application-output.dto';
import { StaticErrors } from '@static/static-errors';

@Injectable()
export class GetOneLoanApplicationByIdService {
  constructor(
    private readonly loanApplicationPrismaRepository: LoanApplicationPrismaRepository,
  ) {}

  public async execute(id: string): Promise<GetOneLoanApplicationOutputDto> {
    const loanApplication = await this.loanApplicationPrismaRepository.getOne({
      id,
    });

    if (!loanApplication) {
      throw new NotFoundException(
        StaticErrors.THE_LOANAPPLICATION_YOU_ARE_LOOKING_FOR_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    return loanApplication;
  }
}
