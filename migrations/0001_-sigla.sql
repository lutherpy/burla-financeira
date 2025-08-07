DROP INDEX "title_idx";--> statement-breakpoint
DROP INDEX "updated_at_idx";--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "sigla" text;--> statement-breakpoint
ALTER TABLE "note" ADD CONSTRAINT "note_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "note_user_id_idx" ON "note" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "note_created_at_idx" ON "note" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");