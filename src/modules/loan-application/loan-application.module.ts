import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/prisma.service';
import { LoanApplicationPrismaRepository } from '@modules/loan-application/repositories/loan-application.prisma.repository';
import { AppCrypto } from '@utilities/app-crypto';
import { CreateOneLoanApplicationController } from '@modules/loan-application/controllers/create-one-loan-application.controller';
import { GetOneLoanApplicationByIdController } from '@modules/loan-application/controllers/get-one-loan-application-by-id.controller';
import { GetManyLoanApplicationController } from '@modules/loan-application/controllers/get-many-loan-application.controller';
import { UpdateOneLoanApplicationByIdController } from '@modules/loan-application/controllers/update-one-loan-application-by-id.controller';
import { DeleteOneLoanApplicationByIdController } from '@modules/loan-application/controllers/delete-one-loan-application-by-id.controller';
import { CreateOneLoanApplicationService } from '@modules/loan-application/services/create-one-loan-application.service';
import { GetManyLoanApplicationService } from '@modules/loan-application/services/get-many-loan-application.service';
import { GetOneLoanApplicationByIdService } from '@modules/loan-application/services/get-one-loan-application-by-id.service';
import { UpdateOneLoanApplicationByIdService } from '@modules/loan-application/services/update-one-loan-application-by-id.service';
import { DeleteOneLoanApplicationByIdService } from '@modules/loan-application/services/delete-one-loan-application-by-id.service';

@Module({
  controllers: [
    CreateOneLoanApplicationController,
    GetManyLoanApplicationController,
    GetOneLoanApplicationByIdController,
    UpdateOneLoanApplicationByIdController,
    DeleteOneLoanApplicationByIdController,
  ],
  providers: [
    CreateOneLoanApplicationService,
    GetManyLoanApplicationService,
    GetOneLoanApplicationByIdService,
    UpdateOneLoanApplicationByIdService,
    DeleteOneLoanApplicationByIdService,
    LoanApplicationPrismaRepository,
    PrismaService,
    AppCrypto,
  ],
  exports: [LoanApplicationPrismaRepository],
})
export class LoanApplicationModule {}
