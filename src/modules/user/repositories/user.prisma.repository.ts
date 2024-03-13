import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/prisma.service';
import { CreateOneUserModelInputDto } from '@modules/user/dtos/create-one-user-model-input.dto';
import { UpdateOneUserModelInputDto } from '@modules/user/dtos/update-one-user-model-input.dto';
import { DeleteOneUserOutputDto } from '@modules/user/dtos/delete-one-user-output.dto';
import { GetOneUserOutputDto } from '@modules/user/dtos/get-one-user-output.dto';
import { GetOneUserWithPasswordOutputDto } from '@modules/user/dtos/get-one-user-with-password-output.dto';
import { GetOneUserWithTokenOutputDto } from '@modules/user/dtos/get-one-user-with-token-output.dto';
import { Prisma } from '@prisma/client';
import { CreateOneUserModelOutputDto } from '@modules/user/dtos/create-one-user-model-output.dto';
import { GetManyUserOutputDto } from '@modules/user/dtos/get-many-user-output.dto';
import { UpdateOneUserModelOutputDto } from '@modules/user/dtos/update-one-user-model-output.dto';
import { SearchParams } from '@src/types/search-params.type';
import { UserSortableFieldList } from '@modules/user/constants/user-sortable-field-list';

@Injectable()
export class UserPrismaRepository {
  private readonly selectWithoutEncryptedData = {
    id: true,
    fullName: true,
  };

  private readonly selectWithoutPasswordAndToken = {
    email: true,
    phone: true,
    role: true,
  };

  private readonly selectDataStats = {
    isActive: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    isActiveChangedAt: true,
    isActiveChangedBy: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  public async createOne(
    createUserModelDto: CreateOneUserModelInputDto,
  ): Promise<CreateOneUserModelOutputDto> {
    return this.prismaService.user.create({
      data: createUserModelDto,
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        ...this.selectDataStats,
      },
    });
  }

  public async getMany(
    searchParams: SearchParams | null = {},
  ): Promise<GetManyUserOutputDto> {
    const {
      page = 1,
      perPage = 10,
      filterBy = undefined,
      filterValue = undefined,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = searchParams;

    const skip = (page - 1) * perPage;

    const orderBy = {};

    const isSortableField = UserSortableFieldList.find(
      (sortableField) => sortableField === sortBy,
    );

    const parsedSortBy = isSortableField || 'createdAt';

    orderBy[parsedSortBy] = sortOrder;

    const filters = {
      [filterBy]: filterValue,
    };

    const userFoundCount = await this.prismaService.user.count({
      where: filters,
    });

    const userFoundList = await this.prismaService.user.findMany({
      where: filters,
      orderBy,
      skip,
      take: Number(perPage),
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        ...this.selectDataStats,
      },
    });

    return {
      data: userFoundList,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(userFoundCount / perPage) || 1,
      totalRecords: userFoundCount,
    };
  }

  public async getOne(
    getOneUserInputDto: Prisma.UserWhereInput,
  ): Promise<GetOneUserOutputDto> {
    return this.prismaService.user.findFirst({
      where: getOneUserInputDto,
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        ...this.selectDataStats,
      },
    });
  }

  public async getOneUnique(
    getOneUserInputDto: Prisma.UserWhereUniqueInput,
  ): Promise<GetOneUserOutputDto> {
    return this.prismaService.user.findUnique({
      where: getOneUserInputDto,
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        ...this.selectDataStats,
      },
    });
  }

  public async getOneByEmailWithPassword(
    email: string,
  ): Promise<GetOneUserWithPasswordOutputDto> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        password: true,
        ...this.selectDataStats,
      },
    });
  }

  public async getOneByIdWithToken(
    id: string,
  ): Promise<GetOneUserWithTokenOutputDto> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        token: true,
        ...this.selectDataStats,
      },
    });
  }

  public async updateOneById(
    id: string,
    updateUserModelDto: UpdateOneUserModelInputDto,
  ): Promise<UpdateOneUserModelOutputDto> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserModelDto,
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectWithoutPasswordAndToken,
        ...this.selectDataStats,
      },
    });
  }

  public async deleteOneById(id: string): Promise<DeleteOneUserOutputDto> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        ...this.selectWithoutEncryptedData,
        ...this.selectDataStats,
      },
    });
  }
}
