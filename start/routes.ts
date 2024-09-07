/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const CompaniesController = () => import('#controllers/companies_controller')
const EmployeesController = () => import('#controllers/employees_controller')

router.get('/companies', [CompaniesController, 'index'])
router.post('/companies', [CompaniesController, 'store'])
router.get('/companies/:id', [CompaniesController, 'show'])
router.put('/companies/:id', [CompaniesController, 'update'])
router.delete('/companies/:id', [CompaniesController, 'destroy'])

router.get('/employees', [EmployeesController, 'index'])
router.post('/employees', [EmployeesController, 'store'])
router.get('/employees/:id', [EmployeesController, 'show'])
router.put('/employees/:id', [EmployeesController, 'update'])
router.delete('/employees/:id', [EmployeesController, 'destroy'])
