import { Router } from 'express'
import { create, deleteUser, read, update } from '../controllers'

const MAIN_PATH = '/users'

const router = Router()

router.route(MAIN_PATH)
    .post(create)

router.route(`${MAIN_PATH}/:id`)
    .get(read)
    .put(update)
    .delete(deleteUser)

export default router