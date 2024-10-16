CREATE TABLE IF NOT EXISTS "workout_completion_series" (
	"id" text PRIMARY KEY NOT NULL,
	"workout_completion_id" text NOT NULL,
	"reps" integer NOT NULL,
	"load" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_completions" (
	"id" text PRIMARY KEY NOT NULL,
	"workout_id" text NOT NULL,
	"start" timestamp with time zone NOT NULL,
	"end" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_completion_series" ADD CONSTRAINT "workout_completion_series_workout_completion_id_workout_completions_id_fk" FOREIGN KEY ("workout_completion_id") REFERENCES "public"."workout_completions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_completions" ADD CONSTRAINT "workout_completions_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
