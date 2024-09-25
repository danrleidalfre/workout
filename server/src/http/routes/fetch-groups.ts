import { db } from '@/db'
import { groups } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchGroups: FastifyPluginAsyncZod = async app => {
  app.get('/groups', async () => {
    return await db
      .select({
        id: groups.id,
        group: groups.title,
      })
      .from(groups)
  })
}
