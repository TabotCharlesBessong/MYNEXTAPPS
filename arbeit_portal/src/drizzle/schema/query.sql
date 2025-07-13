-- ============================================
-- STEP 1: Create Custom ENUM Types
-- Run these first as they're referenced by tables
-- ============================================

CREATE TYPE "public"."job_listings_experience_level" AS ENUM('junior', 'mid-level', 'senior');

CREATE TYPE "public"."job_listings_status" AS ENUM('draft', 'published', 'delisted');

CREATE TYPE "public"."job_listings_type" AS ENUM('internship', 'part-time', 'full-time');

CREATE TYPE "public"."job_listings_location_requirement" AS ENUM('in-office', 'hybrid', 'remote');

CREATE TYPE "public"."job_listings_wage_interval" AS ENUM('hourly', 'yearly');

CREATE TYPE "public"."job_listing_applications_stage" AS ENUM('denied', 'applied', 'interested', 'interviewed', 'hired');

-- ============================================
-- STEP 2: Create Base Tables (No Foreign Keys)
-- Create tables that other tables depend on first
-- ============================================

-- Users table (referenced by multiple tables)
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"imageUrl" varchar NOT NULL,
	"email" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Organizations table (referenced by job_listings)
CREATE TABLE "organizations" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"imageUrl" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);

-- ============================================
-- STEP 3: Create Dependent Tables
-- Create tables that reference the base tables
-- ============================================

-- Job listings table (references organizations)
CREATE TABLE "job_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"wage" integer,
	"wageInterval" "job_listings_wage_interval",
	"stateAbbreviation" varchar,
	"city" varchar,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"locationRequirement" "job_listings_location_requirement" NOT NULL,
	"experienceLevel" "job_listings_experience_level" NOT NULL,
	"status" "job_listings_status" DEFAULT 'draft' NOT NULL,
	"type" "job_listings_type" NOT NULL,
	"postedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);

-- User resumes table (references users)
CREATE TABLE "user_resumes" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"resumeFileUrl" varchar NOT NULL,
	"resumeFileKey" varchar NOT NULL,
	"aiSummary" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);

-- User notification settings table (references users)
CREATE TABLE "user_notification_settings" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"newJobEmailNotifications" boolean DEFAULT false NOT NULL,
	"aiPrompt" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);

-- ============================================
-- STEP 4: Create Junction/Many-to-Many Tables
-- Create tables that reference multiple other tables
-- ============================================

-- Job listing applications table (references both job_listings and users)
CREATE TABLE "job_listing_applications" (
	"jobListingId" uuid NOT NULL,
	"userId" varchar NOT NULL,
	"coverLetter" text,
	"rating" integer,
	"stage" "job_listing_applications_stage" DEFAULT 'applied' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_listing_applications_jobListingId_userId_pk" PRIMARY KEY("jobListingId","userId")
);

-- Organization user settings table (references both users and organizations)
CREATE TABLE "organization_user_settings" (
	"userId" varchar NOT NULL,
	"organizationId" varchar NOT NULL,
	"newApplicationEmailNotifications" boolean DEFAULT false NOT NULL,
	"minimumRating" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organization_user_settings_userId_organizationId_pk" PRIMARY KEY("userId","organizationId")
);

-- ============================================
-- STEP 5: Add Foreign Key Constraints
-- Add all foreign key relationships after tables exist
-- ============================================

-- Job listings foreign key
ALTER TABLE "job_listings" 
ADD CONSTRAINT "job_listings_organizationId_organizations_id_fk" 
FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") 
ON DELETE cascade ON UPDATE no action;

-- User resumes foreign key
ALTER TABLE "user_resumes" 
ADD CONSTRAINT "user_resumes_userId_users_id_fk" 
FOREIGN KEY ("userId") REFERENCES "public"."users"("id") 
ON DELETE no action ON UPDATE no action;

-- User notification settings foreign key
ALTER TABLE "user_notification_settings" 
ADD CONSTRAINT "user_notification_settings_userId_users_id_fk" 
FOREIGN KEY ("userId") REFERENCES "public"."users"("id") 
ON DELETE no action ON UPDATE no action;

-- Job listing applications foreign keys
ALTER TABLE "job_listing_applications" 
ADD CONSTRAINT "job_listing_applications_jobListingId_job_listings_id_fk" 
FOREIGN KEY ("jobListingId") REFERENCES "public"."job_listings"("id") 
ON DELETE cascade ON UPDATE no action;

ALTER TABLE "job_listing_applications" 
ADD CONSTRAINT "job_listing_applications_userId_users_id_fk" 
FOREIGN KEY ("userId") REFERENCES "public"."users"("id") 
ON DELETE cascade ON UPDATE no action;

-- Organization user settings foreign keys
ALTER TABLE "organization_user_settings" 
ADD CONSTRAINT "organization_user_settings_userId_users_id_fk" 
FOREIGN KEY ("userId") REFERENCES "public"."users"("id") 
ON DELETE no action ON UPDATE no action;

ALTER TABLE "organization_user_settings" 
ADD CONSTRAINT "organization_user_settings_organizationId_organizations_id_fk" 
FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") 
ON DELETE no action ON UPDATE no action;

-- ============================================
-- STEP 6: Create Indexes
-- Add indexes for performance optimization
-- ============================================

CREATE INDEX "job_listings_stateAbbreviation_index" 
ON "job_listings" USING btree ("stateAbbreviation");