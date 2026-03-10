/*
  Warnings:

  - You are about to drop the column `employmentStatus` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Borrower` table. All the data in the column will be lost.
  - Added the required column `dob` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incomeFrequency` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanAmount` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ConsentRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ConsentRecord_applicationId_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "employmentStatus",
ADD COLUMN     "dob" TEXT NOT NULL,
ADD COLUMN     "incomeFrequency" TEXT NOT NULL,
ADD COLUMN     "loanAmount" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Borrower" DROP COLUMN "dob";

-- AlterTable
ALTER TABLE "ConsentRecord" ADD COLUMN     "agreed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" TEXT NOT NULL;
