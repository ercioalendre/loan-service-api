import { Controller, Param, Delete } from '@nestjs/common';
import { DeleteOneUserOutputDto } from '@modules/user/dtos/delete-one-user-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { DeleteOneUserByIdService } from '../services/delete-one-user-by-id.service';

@Controller('user')
@Roles(Role.Admin)
@ApiTags('User')
export class DeleteOneUserByIdController extends AppController {
  constructor(
    private readonly deleteOneUserByIdService: DeleteOneUserByIdService,
  ) {
    super();
  }

  @Delete('delete-one/id/:id')
  @ApiOperation({
    summary: 'Deletes one single user by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<DeleteOneUserOutputDto> {
    return await this.deleteOneUserByIdService.execute(id);
  }
}
