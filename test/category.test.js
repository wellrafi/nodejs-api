let supertest = require('supertest');
let request = supertest('http://localhost:3000');
let duplicate = "jhon2800"

describe('category crud test', () => {

	test('GET 200 - list categories', async (done) => {
		const response = await request.get('/kategori');
		expect(response.status).toBe(200);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(200);
		expect(response.body.message).toBe("OK");
		done();
	});

	test('POST 201 - create success', async (done) => {
		const response = await request.post('/kategori').send({ name: duplicate });
		expect(response.status).toBe(201);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(201);
		expect(response.body.message).toBe('request success');
		done();
	});

	test('POST 422 - check duplicate', async (done) => {
		const response = await request.post('/kategori').send({ name: duplicate });
		expect(response.status).toBe(422);
		expect(response.body.success).toBe(0);
		expect(response.body.code).toBe(422);
		expect(response.body.message).toBe('Duplicate ' + duplicate);
		done();
	});

	test('POST 422 - check data empty', async (done) => {
		const response = await request.post('/kategori').send({ name: '' });
		expect(response.status).toBe(422);
		expect(response.body.success).toBe(0);
		expect(response.body.code).toBe(422);
		expect(response.body.message).toBe('Unprocessable Entity');
		done();
	});

	test('PUT 422 - input duplicate', async (done) => {
		const response = await request.put('/kategori/' + duplicate).send({ name: duplicate });
		expect(response.status).toBe(422);
		expect(response.body.success).toBe(0);
		expect(response.body.code).toBe(422);
		expect(response.body.message).toBe('Duplicate ' + duplicate);
		done();
	});

	test('PUT 200 - success', async (done) => {
		const response = await request.put('/kategori/' + duplicate).send({ name: duplicate + "updated" });
		expect(response.status).toBe(200);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(200);
		expect(response.body.message).toBe('OK');
		done();
	});

	test('DELETE 200 - delete single data', async (done) => {
		const response = await request.delete('/kategori/' + duplicate + "updated");
		expect(response.status).toBe(200);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(200);
		expect(response.body.message).toBe('OK');
		done();
	});

});
