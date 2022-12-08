import { describe, expect, it } from '@jest/globals';
import User from '@lib/api/models/user';
import { mockRequest, mockResponse } from '__tests__/unit/mock'; // cant use import
import login from 'pages/api/auth/login/accountLogin';
import { storePsw } from '@lib/api/auth/pswStorage';
import { randomBytes } from 'crypto';
// not done
describe('Login tests', () => {
	beforeAll(async () => {
		const salt = randomBytes(16).toString('base64');
		await User.create({
			email: 'logintestemail@gmail.com',
			password: await storePsw('password', salt),
			salt,
			firstName: 'testF',
			lastName: 'testL',
		});
	});

	afterAll(async () => {
		await User.deleteOne({ email: 'logintestemail@gmail.com' });
	});

	const res = mockResponse();

	it('valid user', async () => {
		await login(
			mockRequest('POST', {
				email: 'logintestemail@gmail.com',
				password: 'password',
			}),
			res
		);

		expect(res.status.mock.calls[0][0]).toBe(200);
	});

	it('only email', async () => {
		await login(mockRequest('POST', { email: 'naveweksler@gmail.com' }), res);

		expect(res.status.mock.calls[0][0]).toBe(400);
	});

	it('only password', async () => {
		await login(mockRequest('POST', { password: 'testpsw' }), res);
		expect(res.status.mock.calls[0][0]).toBe(400);
	});

	it('bad email', async () => {
		await login(
			mockRequest('POST', {
				email: 'naveweksler',
				password: 'testpsw',
			}),
			res
		);
		expect(res.status.mock.calls[0][0]).toBe(400);
	});

	it('bad password', async () => {
		await login(
			mockRequest('POST', {
				email: 'naveweksler',
				password: 'test',
			}),
			res
		);

		expect(res.status.mock.calls[0][0]).toBe(400);
	});
});
