import { postgres } from '../postgres'
import { insert, retrieve, retrieveAll, update, deleteId } from '../models/register'

export function routes(router) {
   router 
      .post('/register', async (req, res) => {
        console.log(`Registration submission: `, req.body)
        const { name, address, password } = req.body
        const id = await insert(postgres(req), name, address, password)
        console.log(`Record created:`, id[0])
        res.send(id[0].id)
      })
      .get('/register', async (req, res) => {
        const users = await retrieveAll(postgres(req))
        res.send(users)
      })
      .get('/register/:id', async (req, res) => {
        const users = await retrieve(postgres(req), req.params.id)
        if (!users[0]) {
          res.send(`Record not found`)
        }
        res.send(users[0])
      })
      .put(`/register/:id`, async (req, res) => {
        const { name, address, password } = req.body 
        const id = await update(postgres(req), name, address, password, req.params.id)
        //console.log(id)
        res.send(id)
      })
      .delete(`/register/:id`, async (req, res) => {
        //console.log(req.params.id)
        const users = await deleteId(postgres(req), req.params.id)
        //console.log(users)
        res.send(`Delete successful!`)
      })
}