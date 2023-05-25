-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasCompletedVerification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twitterHandle" TEXT,
ADD COLUMN     "twitterId" TEXT,
ADD COLUMN     "twitterImage" TEXT,
ADD COLUMN     "twitterName" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "signature" TEXT;
