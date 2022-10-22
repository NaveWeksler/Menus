const client = require('__tests__/client'); // cant use import
const login = require('pages/api/auth/login/accountLogin').default;
// not done
describe('Login tests', () => {
    it('only email', async () => {
        const res = await client(login)
            .post('/api/auth/login/accountLogin')
            .send({
                email: 'naveweksler@gmail.com',
            });
        expect(res.status).toBe(400);
    });

    it('only password', async () => {
        const res = await client(login)
            .post('/api/auth/login/accountLogin')
            .send({
                password: 'testpsw',
            });
        expect(res.status).toBe(400);
    });

    it('bad email', async () => {
        const res = await client(login)
            .post('/api/auth/login/accountLogin')
            .send({
                email: 'naveweksler',
                password: 'testpsw',
            });
        expect(res.status).toBe(400);
    });

    it('bad password', async () => {
        const res = await client(login)
            .post('/api/auth/login/accountLogin')
            .send({
                email: 'naveweksler',
                password: 'test', // min 5 chars
            });
        expect(res.status).toBe(400);
    });
});
