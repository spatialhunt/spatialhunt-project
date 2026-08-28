-- CreateEnum
CREATE TYPE "FurnishingType" AS ENUM ('UNFURNISHED', 'SEMI_FURNISHED', 'FURNISHED');

-- CreateEnum
CREATE TYPE "PricePeriod" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "furnishing" "FurnishingType" NOT NULL DEFAULT 'UNFURNISHED',
ADD COLUMN     "landmarks" JSONB,
ADD COLUMN     "pricePeriod" "PricePeriod" NOT NULL DEFAULT 'YEARLY';
