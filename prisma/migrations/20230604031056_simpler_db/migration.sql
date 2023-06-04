/*
  Warnings:

  - You are about to drop the column `hasCompletedVerification` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterHandle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasCompletedVerification",
DROP COLUMN "signature",
DROP COLUMN "twitterHandle",
DROP COLUMN "twitterId",
DROP COLUMN "twitterImage",
DROP COLUMN "twitterName";
