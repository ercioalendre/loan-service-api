import {
  Controller,
  Body,
  Patch,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateOneLoanApplicationInputDto } from '@modules/loan-application/dtos/update-one-loan-application-input.dto';
import { UpdateOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/update-one-loan-application-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Request } from 'express';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { Throttle } from '@nestjs/throttler';
import { UpdateOneLoanApplicationByIdService } from '../services/update-one-loan-application-by-id.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('applications')
@Roles(Role.Admin)
@ApiTags('Applications')
export class UpdateOneLoanApplicationByIdController extends AppController {
  constructor(
    private readonly updateOneLoanApplicationByIdService: UpdateOneLoanApplicationByIdService,
  ) {
    super();
  }

  @Patch('update-one/id/:id')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @UseInterceptors(FilesInterceptor('loan-applicationFileList'))
  @ApiOperation({
    summary: 'Updates one single loan application by ID.',
  })
  public async handler(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() body: UpdateOneLoanApplicationInputDto,
  ): Promise<UpdateOneLoanApplicationOutputDto> {
    return this.updateOneLoanApplicationByIdService.execute(
      id,
      body,
      request['sessionUser'],
    );
  }
}
