import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/prisma.service';
import { CreateOneLoanApplicationModelInputDto } from '@modules/loan-application/dtos/create-one-loan-application-model-input.dto';
import { UpdateOneLoanApplicationModelInputDto } from '@modules/loan-application/dtos/update-one-loan-application-model-input.dto';
import { DeleteOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/delete-one-loan-application-output.dto';
import { GetOneLoanApplicationOutputDto } from '@modules/loan-application/dtos/get-one-loan-application-output.dto';
import { Prisma } from '@prisma/client';
import { CreateOneLoanApplicationModelOutputDto } from '@modules/loan-application/dtos/create-one-loan-application-model-output.dto';
import { GetManyLoanApplicationOutputDto } from '@modules/loan-application/dtos/get-many-loan-application-output.dto';
import { UpdateOneLoanApplicationModelOutputDto } from '@modules/loan-application/dtos/update-one-loan-application-model-output.dto';
import { SearchParams } from '@src/types/search-params.type';
import { LoanApplicationSortableFieldList } from '@modules/loan-application/constants/loan-application-sortable-field-list';

@Injectable()
export class LoanApplicationPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createOne(
    createLoanApplicationModelDto: CreateOneLoanApplicationModelInputDto,
  ): Promise<CreateOneLoanApplicationModelOutputDto> {
    return this.prismaService.loanApplication.create({
      data: createLoanApplicationModelDto,
    });
  }

  public async getMany(
    searchParams: SearchParams | null = {},
  ): Promise<GetManyLoanApplicationOutputDto> {
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

    const isSortableField = LoanApplicationSortableFieldList.find(
      (sortableField) => sortableField === sortBy,
    );

    const parsedSortBy = isSortableField || 'createdAt';

    orderBy[parsedSortBy] = sortOrder;

    const filters = {
      [filterBy]: filterValue,
    };

    const loanApplicationFoundCount =
      await this.prismaService.loanApplication.count({
        where: filters,
      });

    const loanApplicationFoundList =
      await this.prismaService.loanApplication.findMany({
        where: filters,
        orderBy,
        skip,
        take: Number(perPage),
      });

    return {
      data: loanApplicationFoundList,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(loanApplicationFoundCount / perPage) || 1,
      totalRecords: loanApplicationFoundCount,
    };
  }

  public async getOne(
    getOneLoanApplicationInputDto: Prisma.LoanApplicationWhereInput,
  ): Promise<GetOneLoanApplicationOutputDto> {
    return this.prismaService.loanApplication.findFirst({
      where: getOneLoanApplicationInputDto,
    });
  }

  public async getOneUnique(
    getOneLoanApplicationInputDto: Prisma.LoanApplicationWhereUniqueInput,
  ): Promise<GetOneLoanApplicationOutputDto> {
    return this.prismaService.loanApplication.findUnique({
      where: getOneLoanApplicationInputDto,
    });
  }

  public async updateOneById(
    id: string,
    updateLoanApplicationModelDto: UpdateOneLoanApplicationModelInputDto,
  ): Promise<UpdateOneLoanApplicationModelOutputDto> {
    return await this.prismaService.loanApplication.update({
      where: {
        id,
      },
      data: updateLoanApplicationModelDto,
    });
  }

  public async deleteOneById(
    id: string,
  ): Promise<DeleteOneLoanApplicationOutputDto> {
    return await this.prismaService.loanApplication.delete({
      where: {
        id,
      },
    });
  }
}
