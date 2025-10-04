-- CreateEnum
CREATE TYPE "public"."Priorities" AS ENUM ('HIGH', 'NORMAL', 'LOW');

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "priority" "public"."Priorities" NOT NULL DEFAULT 'NORMAL';
