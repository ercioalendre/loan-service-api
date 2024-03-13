import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { GetManyLoanApplicationInputDto } from '@modules/loan-application/dtos/get-many-loan-application-input.dto';
import { GetManyLoanApplicationService } from '../services/get-many-loan-application.service';
import { Response } from 'express';
import { LoanApplicationBaseOutputDto } from '../dtos/loan-application-base-output.dto';

@Controller('applications')
@Roles(Role.Admin)
@ApiTags('Applications')
export class GetManyLoanApplicationController extends AppController {
  constructor(
    private readonly getManyLoanApplicationService: GetManyLoanApplicationService,
  ) {
    super();
  }

  @Get('get-many')
  @ApiOperation({
    summary: 'Gets many loan application.',
  })
  public async handler(
    @Res({ passthrough: true }) response: Response,
    @Query() searchParams?: GetManyLoanApplicationInputDto | null,
  ): Promise<LoanApplicationBaseOutputDto[]> {
    const LoanApplicationListWithPaginationMetadata =
      await this.getManyLoanApplicationService.execute(searchParams);

    const { data, ...metadata } = LoanApplicationListWithPaginationMetadata;

    response.header('currentPage', String(metadata.currentPage));

    response.header('lastPage', String(metadata.lastPage));

    response.header('perPage', String(metadata.perPage));

    response.header('totalRecords', String(metadata.totalRecords));

    return data;
  }
}
