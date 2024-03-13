import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateOneLoanApplicationInputDto } from '@modules/loan-application/dtos/create-one-loan-application-input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Throttle } from '@nestjs/throttler';
import { CreateOneLoanApplicationService } from '@modules/loan-application/services/create-one-loan-application.service';
import { Public } from '@decorators/public.decorator';

@Controller('applications')
@ApiTags('Applications')
export class CreateOneLoanApplicationController extends AppController {
  constructor(
    private readonly createOneLoanApplicationService: CreateOneLoanApplicationService,
  ) {
    super();
  }

  @Public()
  @Post('create-one')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Creates one single loan application.',
  })
  public async handler(
    @Req() request: Request,
    @Body()
    createLoanApplicationInputDto: CreateOneLoanApplicationInputDto,
  ) {
    return await this.createOneLoanApplicationService.execute(
      createLoanApplicationInputDto,
      request['sessionUser'],
    );
  }
}
