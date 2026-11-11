CREATE TABLE "siteSettings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"resume_url" text,
	"updated_at" timestamp DEFAULT now()
);
