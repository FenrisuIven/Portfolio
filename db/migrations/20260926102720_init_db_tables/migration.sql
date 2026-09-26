CREATE TYPE "projectStatus" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "programmingProjects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"what_i_learned" text NOT NULL,
	"tech_tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"github_url" text,
	"live_url" text,
	"cover_image_url" text NOT NULL,
	"gallery_urls" text[] DEFAULT '{}'::text[],
	"featured" boolean DEFAULT true,
	"status" "projectStatus" DEFAULT 'draft'::"projectStatus",
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "artPieces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"gallery_urls" text[] DEFAULT '{}'::text[],
	"tags" text[] DEFAULT '{}'::text[],
	"time_spent" text,
	"character_owner" text,
	"character_url" text,
	"featured" boolean DEFAULT true,
	"status" "projectStatus" DEFAULT 'draft'::"projectStatus",
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
