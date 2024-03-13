import { Controller, Get, Param } from '@nestjs/common';
import { GetOneUserOutputDto } from '@modules/user/dtos/get-one-user-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { GetOneUserByIdService } from '@modules/user/services/get-one-user-by-id.service';

@Controller('user')
@Roles(Role.Admin)
@ApiTags('User')
export class GetOneUserByIdController extends AppController {
  constructor(private readonly getOneUserByIdService: GetOneUserByIdService) {
    super();
  }

  @Get('get-one/id/:id')
  @ApiOperation({
    summary: 'Gets one single user by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<GetOneUserOutputDto | null> {
    return await this.getOneUserByIdService.execute(id);
  }
}
