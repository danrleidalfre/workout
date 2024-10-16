ALTER TABLE "workout_completion_series" ADD COLUMN "exercise_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_completion_series" ADD CONSTRAINT "workout_completion_series_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
