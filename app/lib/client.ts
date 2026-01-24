import { hc } from 'hono/client'
import type { App } from '../server'

export const client = hc<App>('/')
