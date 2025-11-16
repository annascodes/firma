/*
  Warnings:

  - A unique constraint covering the columns `[userId,companyId]` on the table `InvitationLetter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InvitationLetter_userId_companyId_key" ON "public"."InvitationLetter"("userId", "companyId");
