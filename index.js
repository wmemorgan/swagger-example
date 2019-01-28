import express from 'express'
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
import * as swagger from 'swagger2'

import { routes as registerRoute } from './routes/register'

import { postgresMiddleware } from './postgres'

const app = express()

const port = 5000
const router = express.Router()

const spec = swagger.loadDocumentSync('./swagger.yaml')
if(!swagger.validateDocument(spec)) {
  throw Error(`Invalid Swagger File`)
}

for (const routes of [
  registerRoute
]) {
  routes(router)
}

app.use('/', swaggerUi.serve)
app.get('/', swaggerUi.setup(spec))

router.get('/swagger.json', (req, res) => {
  res.send(spec)
})

app.use(bodyParser())
app.use(postgresMiddleware())
app.use('/v1', router)

app.listen(port, () => {
  console.log(`Example running at port ${port}`)
})
