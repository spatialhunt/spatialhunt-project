-- CreateEnum
CREATE TYPE "ListingIntent" AS ENUM ('RENT', 'SALE');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "listingIntent" "ListingIntent" NOT NULL DEFAULT 'RENT';
