/*
  Warnings:

  - A unique constraint covering the columns `[teamName]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamShieldUrl]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_teamName_key" ON "Team"("teamName");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamShieldUrl_key" ON "Team"("teamShieldUrl");
