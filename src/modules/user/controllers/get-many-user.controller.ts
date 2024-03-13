import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { GetManyUserInputDto } from '@modules/user/dtos/get-many-user-input.dto';
import { GetManyUserService } from '../services/get-many-user.service';
import { Response } from 'express';
import { UserBaseOutputDto } from '../dtos/user-base-output.dto';

@Controller('user')
@Roles(Role.Admin)
@ApiTags('User')
export class GetManyUserController extends AppController {
  constructor(private readonly getManyUserService: GetManyUserService) {
    super();
  }

  @Get('get-many')
  @ApiOperation({
    summary: 'Gets many users.',
  })
  public async handler(
    @Res({ passthrough: true }) response: Response,
    @Query() searchParams?: GetManyUserInputDto | null,
  ): Promise<UserBaseOutputDto[]> {
    const userListWithPaginationMetadata =
      await this.getManyUserService.execute(searchParams);

    const { data, ...metadata } = userListWithPaginationMetadata;

    response.header('currentPage', String(metadata.currentPage));

    response.header('lastPage', String(metadata.lastPage));

    response.header('perPage', String(metadata.perPage));

    response.header('totalRecords', String(metadata.totalRecords));

    return data;
  }
}
