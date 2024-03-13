import { Controller, Param, Delete } from '@nestjs/common';
import { DeleteOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/delete-one-loan-application-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { DeleteOneLoanApplicationByIdService } from '@modules/loan-application/services/delete-one-loan-application-by-id.service';

@Controller('applications')
@Roles(Role.Admin)
@ApiTags('Applications')
export class DeleteOneLoanApplicationByIdController extends AppController {
  constructor(
    private readonly deleteOneLoanApplicationByIdService: DeleteOneLoanApplicationByIdService,
  ) {
    super();
  }

  @Delete('delete-one/id/:id')
  @ApiOperation({
    summary: 'Deletes one single loan application by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<DeleteOneLoanApplicationOutputDto> {
    return await this.deleteOneLoanApplicationByIdService.execute(id);
  }
}
