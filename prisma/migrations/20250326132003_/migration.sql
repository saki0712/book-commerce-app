/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `purchase_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "purchase_logs_userId_bookId_key" ON "purchase_logs"("userId", "bookId");
