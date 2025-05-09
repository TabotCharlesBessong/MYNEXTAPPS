-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('SUBSCRIBER', 'INTERESTED', 'CONTACTED', 'PURCHASED', 'COLD');

-- CreateEnum
CREATE TYPE "ClassifiedStatus" AS ENUM ('LIVE', 'DRAFT', 'SOLD');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('GBP', 'EUR', 'USD');

-- CreateEnum
CREATE TYPE "OdoUnit" AS ENUM ('MILES', 'KILOMETERS');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('SEDAN', 'HATCHBACK', 'SUV', 'COUPE', 'CONVERTIBLE', 'WAGON');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "Colour" AS ENUM ('BLACK', 'BLUE', 'BROWN', 'GOLD', 'GREEN', 'GREY', 'ORANGE', 'PINK', 'PURPLE', 'RED', 'SILVER', 'WHITE', 'YELLOW');

-- CreateEnum
CREATE TYPE "ULEZCompliance" AS ENUM ('EXEMPT', 'NON_EXEMPT');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "requires2FA" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classifieds" (
    "id" SERIAL NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "vrm" TEXT,
    "title" TEXT,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "odo_reading" INTEGER NOT NULL DEFAULT 0,
    "doors" INTEGER NOT NULL DEFAULT 2,
    "seats" INTEGER NOT NULL DEFAULT 5,
    "price" INTEGER NOT NULL DEFAULT 0,
    "make_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "model_variant_id" INTEGER,
    "ulezCompliance" "ULEZCompliance" NOT NULL DEFAULT 'EXEMPT',
    "transmission" "Transmission" NOT NULL DEFAULT 'MANUAL',
    "colour" "Colour" NOT NULL DEFAULT 'BLACK',
    "fuelType" "FuelType" NOT NULL DEFAULT 'PETROL',
    "bodyType" "BodyType" NOT NULL DEFAULT 'SEDAN',
    "odoUnit" "OdoUnit" NOT NULL DEFAULT 'MILES',
    "currency" "CurrencyCode" NOT NULL DEFAULT 'GBP',
    "status" "ClassifiedStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classifieds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "booking_date" TIMESTAMP(3),
    "terms_accepted" BOOLEAN NOT NULL DEFAULT false,
    "status" "CustomerStatus" NOT NULL DEFAULT 'INTERESTED',
    "classified_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_lifecycle" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "old_status" "CustomerStatus" NOT NULL,
    "new_status" "CustomerStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_lifecycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "alt" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "classified_id" INTEGER NOT NULL,
    "blurhash" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "makes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "makes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model_variants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,
    "yearStart" INTEGER NOT NULL,
    "yearEnd" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "classifieds_slug_key" ON "classifieds"("slug");

-- CreateIndex
CREATE INDEX "index_make_model" ON "classifieds"("make_id", "model_id");

-- CreateIndex
CREATE INDEX "index_status" ON "classifieds"("status");

-- CreateIndex
CREATE INDEX "index_price" ON "classifieds"("price");

-- CreateIndex
CREATE INDEX "page_views_path_viewed_at_idx" ON "page_views"("path", "viewed_at");

-- CreateIndex
CREATE UNIQUE INDEX "makes_name_key" ON "makes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "models_make_id_name_key" ON "models"("make_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "model_variants_model_id_name_key" ON "model_variants"("model_id", "name");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifieds" ADD CONSTRAINT "classifieds_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "makes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifieds" ADD CONSTRAINT "classifieds_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifieds" ADD CONSTRAINT "classifieds_model_variant_id_fkey" FOREIGN KEY ("model_variant_id") REFERENCES "model_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_classified_id_fkey" FOREIGN KEY ("classified_id") REFERENCES "classifieds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_lifecycle" ADD CONSTRAINT "customer_lifecycle_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_classified_id_fkey" FOREIGN KEY ("classified_id") REFERENCES "classifieds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "makes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model_variants" ADD CONSTRAINT "model_variants_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
