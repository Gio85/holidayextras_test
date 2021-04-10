import { Router } from 'express'
import { create, deleteUser, read, update } from '../controllers'
import { list } from '../controllers/list'

const MAIN_PATH = '/users'

const router = Router()

router.route(MAIN_PATH)
    .get(list)
    .post(create)

router.route(`${MAIN_PATH}/:id`)
    .get(read)
    .put(update)
    .delete(deleteUser)

export default router