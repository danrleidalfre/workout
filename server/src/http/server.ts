import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createExercise } from './routes/create-exercise'
import { createWorkout } from './routes/create-workout'
import { deleteExercise } from './routes/delete-exercise'
import { deleteWorkout } from './routes/delete-workout'
import { fetchExercise } from './routes/fetch-exercise'
import { fetchExercises } from './routes/fetch-exercises'
import { fetchGroups } from './routes/fetch-groups'
import { fetchWorkout } from './routes/fetch-workout'
import { fetchWorkouts } from './routes/fetch-workouts'
import { updateExercise } from './routes/update-exercise'
import { updateWorkout } from './routes/update-workout'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(createWorkout)
app.register(fetchWorkouts)
app.register(fetchWorkout)
app.register(updateWorkout)
app.register(deleteWorkout)

app.register(createExercise)
app.register(fetchExercise)
app.register(fetchExercises)
app.register(updateExercise)
app.register(deleteExercise)

app.register(fetchGroups)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server Running')
  })
