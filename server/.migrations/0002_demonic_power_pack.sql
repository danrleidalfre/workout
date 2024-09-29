ALTER TABLE "workout_exercise_series" DROP CONSTRAINT "workout_exercise_series_workout_exercise_id_workout_exercises_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_series" ADD CONSTRAINT "workout_exercise_series_workout_exercise_id_workout_exercises_id_fk" FOREIGN KEY ("workout_exercise_id") REFERENCES "public"."workout_exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
