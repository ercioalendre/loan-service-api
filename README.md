# loan-service-api

This README will guide you through the process of setting up and running the application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version >= 18)
- npm (version >= 10) or pnpm (version >= 8)
- Postgres database instance

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/ercioalendre/loan-service-api.git
```

2. Navigate to the project directory:

```bash
cd loan-service-api
```

3. Install dependencies:

```bash
npm install
# or
pnpm install
```

## Configuration

1. Copy the `.env.example` file and rename it to `.env`.

2. Open the `.env` file and configure the environment variables according to your setup. Make sure to fill in any necessary database connection strings or other environment-specific configurations.

3. Run database migrations:

```bash
npx prisma migrate deploy
# or
pnpm prisma migrate deploy
```

4. Generate Prisma Client:

```bash
npx prisma generate
# or
pnpm prisma generate
```

5. Seed the database with initial data running the following command:

```bash
npx prisma db seed
# or
pnpm prisma db seed
```

## Running the Application

1. Start the application in development mode:

```bash
npm run dev
# or
pnpm dev
```

This command will start the application in watch mode, so any changes you make to the source code will automatically restart the server.

2. Once the server is running, you can access the application at `http://localhost:3000` by default.

## Building for Production

To build the application for production, use the following command:

```bash
npm run build
# or
yarn build
```

This will compile the TypeScript code into JavaScript and output it to the `dist` directory.

## Running in Production

To run the application in production mode, first build the application using the above command, then start the server using:

```bash
npm start
# or
pnpm start
```

## Running with Docker

To run the application with Docker, follow these steps:

1. Run the Postgres (database) container:

```bash
docker run -d -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=docker postgres:16
```

2. Build the application image:

```bash
docker build --no-cache -t loan-service-api:latest .
```

3. Run the application container:

```bash
docker run -d -p 3000:3000 --name loan-service-api loan-service-api:latest
```

## Running with Docker Compose

To run the application with Docker Compose, follow these steps:

1. Build the Docker images:

```bash
docker-compose build --no-cache
```

2. Start the services:

```bash
docker-compose up -d
```

## Admin Credentials

Use the following credentials to authenticate as Admin:

```json
{
  "email": "admin@admin.com",
  "password": "!6NnTu7+4a"
}
```

## API Documentation

The documentation for this application can be accessed at:

```
http://localhost:3000/api-docs
```

It provides detailed information about the available endpoints, request parameters, and responses.

## Additional Information

For more detailed information about NestJS, refer to the [official documentation](https://docs.nestjs.com).

## License

This project is licensed under the [MIT License](LICENSE).
