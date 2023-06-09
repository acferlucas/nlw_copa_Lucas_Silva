/*
  Warnings:

  - You are about to drop the column `firstTeamCountryCode` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamCountryCode` on the `Game` table. All the data in the column will be lost.
  - Added the required column `firstTeamId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondTeamId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    "teamShieldUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamId" TEXT NOT NULL,
    "secondTeamId" TEXT NOT NULL,
    CONSTRAINT "Game_firstTeamId_fkey" FOREIGN KEY ("firstTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_secondTeamId_fkey" FOREIGN KEY ("secondTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("date", "id") SELECT "date", "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
