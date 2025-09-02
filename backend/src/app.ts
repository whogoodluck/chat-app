import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import userRouter from './routes/user.route'

import unknownEndpoint from './middlewares/unknown-endpoint'
import errorHandler from './middlewares/error-handler'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

app.use(cors())

app.use(helmet())
app.use(compression())

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK')
})

app.use('/api/users', userRouter)

app.use(unknownEndpoint)
app.use(errorHandler as unknown as express.ErrorRequestHandler)

export default app
