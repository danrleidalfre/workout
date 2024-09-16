import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createWorkout } from './routes/create-workout'
import { fetchWorkout } from './routes/fetch-workout'
import { fetchWorkouts } from './routes/fetch-workouts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createWorkout)
app.register(fetchWorkouts)
app.register(fetchWorkout)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server Running')
  })
