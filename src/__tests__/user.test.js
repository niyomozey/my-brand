import 'jest-extended'
import app from '../../app'
import User from '../models/user'
import supertest from 'supertest'
import auth from '../middleware/auth'
import verifyUser from '../middleware/verifyUser'
import "regenerator-runtime/runtime.js";

const request  = supertest(app)

beforeEach(async () =>{
	await User.deleteMany()
} )
afterEach(async () =>{
	await User.deleteMany()
} )
test('should get All users', async () => {
	const response =  await request.get('/niyo/profile').send()
	expect(response.status).toBe(200)
})
test('go to landing page', async () => {
	const response =  await request.get('/niyo/home').send()
	expect(response.status).toBe(200)
})
test('should be able to signup user', async () => {
	const response = await request.post('niyo/signup').send({
		fullName: 'Niyonkuru Moise',
		username: 'niyonkuru',
        telphone: '0780644280',
		password: '123456',
        cpassword: '123456',
		email: 'moiseniyonkuru1@gmail.com',
	})
	expect(response.status).toBe(202)
})
test('User should not signup with incorrent email', async () => {
	const response = await request.post('niyo/signup').send({
		fullName: 'Niyonkuru Moise',
		username: 'niyonkuru',
        telphone: '0780644280',
		password: '123456',
        cpassword: '123456',
		email: 'moiseniyonkuru1.com',
	})
	expect(response.status).toBe(400)
})
test('User should not signup with incorrent password', async () => {
	const response = await request.post('niyo/signup').send({
		fullName: 'Niyonkuru Moise',
		username: 'niyonkuru',
        telphone: '0780644280',
		password: '1234',
        cpassword: '123456',
		email: 'moiseniyonkuru1@gmail.com',
	})
	expect(response.status).toBe(400)
})




