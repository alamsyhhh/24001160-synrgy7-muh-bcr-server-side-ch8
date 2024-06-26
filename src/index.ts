import express, { Express, Request, Response } from 'express'
import { carRoutes } from './routes/carsRoutes'
import { userRoutes } from './routes/usersRoutes'
import { knexInstance } from '../config/postgresConfig'
import { Model } from 'objection'
import errorHandlingMiddleware from './middlewares/errorUploadHandlingMiddleware'
import swaggerUi from 'swagger-ui-express'
import apidocs from '../apidocs.json'
import cors from 'cors'

Model.knex(knexInstance)

const PORT = 9000
const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const v1 = '/api/v1'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apidocs))

app.use(`${v1}`, carRoutes, errorHandlingMiddleware)
app.use(`${v1}`, userRoutes)

// Route to display a message on the homepage
app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Welcome to My Server</h1>')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}/`)
})
