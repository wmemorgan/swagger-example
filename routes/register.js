import { postgres } from '../postgres'
import { insert, retrieve, retrieveAll, update } from '../models/register'

export function routes(router) {
   router 
      .post('/register', async (req, res) => {
        //console.log(req.body)
        const { name, address, password } = req.body
        const id = await insert(postgres(req), name, address, password)
        console.log(id[0].id)
        res.send(id[0].id)
      })
      .get('/register', async (req, res) => {
        const users = await retrieveAll(postgres(req))
        res.send(users)
      })
      .get('/register/:id', async (req, res) => {
        console.log(req.params.id)
        const users = await retrieve(postgres(req), req.params.id)
        res.send(users[0])
      })
      .put(`/register/:id`, async (req, res) => {
        const { name, address, password } = req.body 
        const id = await update(postgres(req), name, address, password, req.params.id)
        res.send(id)
      })
      .delete(`/register:id`, async (req, res) => {
        console.log(req.params.id)
        const users = await retrieve(postgres(req), req.params.id)
        res.send(`Delete successful!`)
      })
}