-- DropIndex
DROP INDEX "members_nic_key";

-- CreateTable
CREATE TABLE "generated_letters" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "templateId" TEXT,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "generatedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generated_letters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "generated_letters" ADD CONSTRAINT "generated_letters_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_letters" ADD CONSTRAINT "generated_letters_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "letter_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
