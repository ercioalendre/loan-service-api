import { Injectable } from '@nestjs/common';
import { LoanApplicationPrismaRepository } from '@modules/loan-application/repositories/loan-application.prisma.repository';
import { GetManyLoanApplicationOutputDto } from '@modules/loan-application/dtos/get-many-loan-application-output.dto';
import { SearchParams } from '@src/types/search-params.type';

@Injectable()
export class GetManyLoanApplicationService {
  constructor(
    private readonly loanApplicationPrismaRepository: LoanApplicationPrismaRepository,
  ) {}

  public async execute(
    searchParams?: SearchParams | null,
  ): Promise<GetManyLoanApplicationOutputDto> {
    return await this.loanApplicationPrismaRepository.getMany(searchParams);
  }
}
