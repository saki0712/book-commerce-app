/*
  Warnings:

  - You are about to drop the `PurchaseLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseLog" DROP CONSTRAINT "PurchaseLog_userId_fkey";

-- DropTable
DROP TABLE "PurchaseLog";

-- CreateTable
CREATE TABLE "purchase_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase_logs" ADD CONSTRAINT "purchase_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
