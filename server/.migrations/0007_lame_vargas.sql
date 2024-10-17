ALTER TABLE "workout_exercise_series" ALTER COLUMN "load" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workout_exercise_series" ADD COLUMN "order" integer NOT NULL;