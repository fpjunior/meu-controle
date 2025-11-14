/*
  Warnings:

  - You are about to drop the column `ibNumber` on the `RM` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rmNumber]` on the table `RM` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rmNumber` to the `RM` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RM_ibNumber_idx";

-- DropIndex
DROP INDEX "RM_ibNumber_key";

-- AlterTable
ALTER TABLE "RM" DROP COLUMN "rmNumber",
ADD COLUMN     "rmNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RM_rmNumber_key" ON "RM"("rmNumber");

-- CreateIndex
CREATE INDEX "RM_rmNumber_idx" ON "RM"("rmNumber");
