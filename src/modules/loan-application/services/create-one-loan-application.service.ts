import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LoanApplicationPrismaRepository } from '@modules/loan-application/repositories/loan-application.prisma.repository';
import { CreateOneLoanApplicationInputDto } from '@modules/loan-application/dtos/create-one-loan-application-input.dto';
import { CreateOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/create-one-loan-application-output.dto';
import { UserBaseOutputDto } from '@modules/user/dtos/user-base-output.dto';
import { Status } from '../constants/status.enum';

@Injectable()
export class CreateOneLoanApplicationService {
  constructor(
    private readonly loanApplicationPrismaRepository: LoanApplicationPrismaRepository,
  ) {}

  public async execute(
    createOneLoanApplicationInputDto: CreateOneLoanApplicationInputDto,
    sessionUser?: UserBaseOutputDto | null,
  ): Promise<CreateOneLoanApplicationOutputDto> {
    const newLoanApplicationModel = {
      id: randomUUID(),
      ...createOneLoanApplicationInputDto,
      status: Status.Pending,
      isActive: true,
      createdAt: new Date(),
      createdBy: sessionUser?.id,
    };

    return await this.loanApplicationPrismaRepository.createOne(
      newLoanApplicationModel,
    );
  }
}
