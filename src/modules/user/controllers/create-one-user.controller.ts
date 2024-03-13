import { Controller, Post, Body } from '@nestjs/common';
import { CreateOneUserInputDto } from '@modules/user/dtos/create-one-user-input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Throttle } from '@nestjs/throttler';
import { CreateOneUserService } from '@modules/user/services/create-one-user.service';
import { Public } from '@decorators/public.decorator';

@Controller('user')
@ApiTags('User')
export class CreateOneUserController extends AppController {
  constructor(private readonly createOneUserService: CreateOneUserService) {
    super();
  }

  @Public()
  @Post('create-one')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Creates one single user.',
  })
  public async handler(
    // @Req() request: Request,
    @Body()
    createUserInputDto: CreateOneUserInputDto,
  ) {
    return await this.createOneUserService.execute(
      createUserInputDto,
      // request['sessionUser'],
    );
  }
}
