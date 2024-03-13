import { Controller, Get, Param } from '@nestjs/common';
import { GetOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/get-one-loan-application-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { GetOneLoanApplicationByIdService } from '@modules/loan-application/services/get-one-loan-application-by-id.service';
import { Public } from '@decorators/public.decorator';

@Public()
@Controller('applications')
@ApiTags('Applications')
export class GetOneLoanApplicationByIdController extends AppController {
  constructor(
    private readonly getOneLoanApplicationByIdService: GetOneLoanApplicationByIdService,
  ) {
    super();
  }

  @Get('get-one/id/:id')
  @ApiOperation({
    summary: 'Gets one single loan application by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<GetOneLoanApplicationOutputDto | null> {
    return await this.getOneLoanApplicationByIdService.execute(id);
  }
}
