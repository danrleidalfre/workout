CREATE TABLE IF NOT EXISTS "exercises" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_exercises" (
	"workout_id" text NOT NULL,
	"exercise_id" text NOT NULL,
	"series" integer,
	"reps" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
