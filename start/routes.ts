/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CompaniesController = () => import('#controllers/companies_controller')
const EmployeesController = () => import('#controllers/employees_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/companies', [CompaniesController, 'index']).use(middleware.auth())

router.post('/companies', [CompaniesController, 'store']).use(middleware.auth())
router.get('/companies/:id', [CompaniesController, 'show']).use(middleware.auth())
router.put('/companies/:id', [CompaniesController, 'update']).use(middleware.auth())
router.delete('/companies/:id', [CompaniesController, 'destroy']).use(middleware.auth())

router.get('/employees', [EmployeesController, 'index']).use(middleware.auth())
router.post('/employees', [EmployeesController, 'store']).use(middleware.auth())
router.get('/employees/:id', [EmployeesController, 'show']).use(middleware.auth())
router.put('/employees/:id', [EmployeesController, 'update']).use(middleware.auth())
router.delete('/employees/:id', [EmployeesController, 'destroy']).use(middleware.auth())

router.get('/users/admins', [UsersController, 'getAdmins']).use(middleware.auth())

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.delete('/logout', [AuthController, 'logout']).use(middleware.auth())
