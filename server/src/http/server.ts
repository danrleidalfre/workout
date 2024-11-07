import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { authenticateUser } from './routes/authenticate-user'
import { completionWorkout } from './routes/completion-workout'
import { createExercise } from './routes/create-exercise'
import { createUser } from './routes/create-user'
import { createWorkout } from './routes/create-workout'
import { deleteExercise } from './routes/delete-exercise'
import { deleteWorkout } from './routes/delete-workout'
import { fetchDurationByWeekCompletions } from './routes/fetch-duration-by-week-completions'
import { fetchExercise } from './routes/fetch-exercise'
import { fetchExercises } from './routes/fetch-exercises'
import { fetchGroups } from './routes/fetch-groups'
import { fetchSeriesByGroupCompletions } from './routes/fetch-series-by-group-completions'
import { fetchVolumeByWeekCompletions } from './routes/fetch-volume-by-week-completions'
import { fetchWorkout } from './routes/fetch-workout'
import { fetchWorkouts } from './routes/fetch-workouts'
import { fetchWorkoutsByMonthCompletions } from './routes/fetch-workouts-by-month-completions'
import { fetchWorkoutsCompletions } from './routes/fetch-workouts-completions'
import { updateExercise } from './routes/update-exercise'
import { updateWorkout } from './routes/update-workout'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: 'super-secret-jwt',
})

app.register(createWorkout)
app.register(fetchWorkouts)
app.register(fetchWorkout)
app.register(updateWorkout)
app.register(deleteWorkout)
app.register(completionWorkout)
app.register(fetchWorkoutsCompletions)
app.register(fetchSeriesByGroupCompletions)
app.register(fetchVolumeByWeekCompletions)
app.register(fetchDurationByWeekCompletions)
app.register(fetchWorkoutsByMonthCompletions)

app.register(createExercise)
app.register(fetchExercise)
app.register(fetchExercises)
app.register(updateExercise)
app.register(deleteExercise)

app.register(fetchGroups)

app.register(createUser)
app.register(authenticateUser)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('Server Running')
  })
