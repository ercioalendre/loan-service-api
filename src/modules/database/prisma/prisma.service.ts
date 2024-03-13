import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private retryCounter = 0;
  private readonly retryDelay = 5000;
  private readonly logger = new Logger(PrismaService.name);

  public async onModuleInit(): Promise<void> {
    this.logger.log('Initializing database connection...');

    await this.connectWithRetry();
  }

  public async onModuleDestroy(): Promise<void> {
    this.logger.log('Initializing database disconnection...');

    await this.$disconnect();
  }

  private async connectWithRetry(): Promise<void> {
    try {
      await this.$connect();

      this.logger.log('Connected to the database successfully!');
    } catch (error) {
      this.logger.error(`Failed to connect to the database: ${error}`);

      this.retryCounter++;

      this.logger.log(
        `Retrying database connection in ${this.retryDelay / 1000} seconds... (${this.retryCounter})`,
      );

      await new Promise((resolve) => setTimeout(resolve, this.retryDelay));

      await this.connectWithRetry();
    }
  }
}
