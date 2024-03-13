-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR NOT NULL,
    "email" VARCHAR,
    "phone" VARCHAR,
    "role" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "token" VARCHAR,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "createdBy" UUID,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "isActiveChangedAt" TIMESTAMP(6),
    "isActiveChangedBy" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanApplication" (
    "id" UUID NOT NULL,
    "applicantId" UUID,
    "requestedAmount" MONEY NOT NULL,
    "loanPurpose" VARCHAR NOT NULL,
    "collateralDescription" VARCHAR,
    "collateralValue" MONEY,
    "interestRate" DECIMAL NOT NULL,
    "loanTerm" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "createdBy" UUID,
    "updatedAt" TIMESTAMP(6),
    "updatedBy" UUID,
    "isActiveChangedAt" TIMESTAMP(6),
    "isActiveChangedBy" UUID,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_isActiveChangedBy_fkey" FOREIGN KEY ("isActiveChangedBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_isActiveChangedBy_fkey" FOREIGN KEY ("isActiveChangedBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
