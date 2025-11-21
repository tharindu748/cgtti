-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "Trade" AS ENUM ('TOOL_MACHINE', 'MILLWRIGHT', 'AUTO_MOBILE', 'BBP', 'AUTO_ELECTRICAL', 'REF_AND_AC', 'MECHATRONIC', 'DISAL_PUMP', 'WELDING', 'POWER_ELECTRICAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'NON_PAID');

-- CreateEnum
CREATE TYPE "LivingStatus" AS ENUM ('ALIVE', 'DECEASED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "trainingNumber" TEXT NOT NULL,
    "membershipYear" INTEGER NOT NULL,
    "trade" "Trade" NOT NULL,
    "name" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "membershipNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "email" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'NON_PAID',
    "livingStatus" "LivingStatus" NOT NULL DEFAULT 'ALIVE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letter_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "letter_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_trainingNumber_key" ON "members"("trainingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "members_membershipNumber_key" ON "members"("membershipNumber");

-- CreateIndex
CREATE UNIQUE INDEX "members_nic_key" ON "members"("nic");

-- CreateIndex
CREATE UNIQUE INDEX "members_userId_key" ON "members"("userId");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
