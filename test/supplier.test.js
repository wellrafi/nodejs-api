let supertest = require('supertest');
let request = supertest('http://localhost:3000');
let duplicate = {
	name: "jhon2801",
	address: "jakarta utara",
	noTelp: "087877954574",
	image: "https://images.unsplash.com/photo-1588691551092-ced49046fbe8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
}

describe('supplier crud test', () => {

	test('GET 200 - list supplier', async (done) => {
		const response = await request.get('/supplier');
		expect(response.status).toBe(200);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(200);
		expect(response.body.message).toBe("OK");
		done();
	});

	test('POST 201 - create success', async (done) => {
		const response = await request.post('/supplier').send({ 
			name: duplicate.name, 
			address: duplicate.address, 
			noTelp: duplicate.noTelp, 
			image: duplicate.image, 
		});
		expect(response.status).toBe(201);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(201);
		expect(response.body.message).toBe('request success');
		done();
	});

	test('POST 422 - check duplicate', async (done) => {
		const response = await request.post('/supplier').send({ 
			name: duplicate.name, 
			address: duplicate.address, 
			noTelp: duplicate.noTelp, 
			image: duplicate.image, 
		});
		expect(response.status).toBe(422);
		expect(response.body.success).toBe(0);
		expect(response.body.code).toBe(422);
		expect(response.body.message).toBe('Duplicate ' + duplicate.name);
		done();
	});

	test('POST 422 - check data empty', async (done) => {
		const response = await request.post('/supplier').send({ 
			name: "", 
			address: "", 
			noTelp: "", 
			image: ""
		 });
		expect(response.status).toBe(422);
		expect(response.body.success).toBe(0);
		expect(response.body.code).toBe(422);
		expect(response.body.message).toBe('Unprocessable Entity');
		done();
	});

	test('PUT 422 - input duplicate', async (done) => {
		const response = await request.put('/supplier/' + duplicate.name).send({ 
			name: duplicate.name, 
			address: duplicate.address, 
			noTelp: duplicate.noTelp, 
			image: duplicate.image, 
		});
		expect(response.status).toBe(422);
		expect(response.body.success).toBe(0);
		expect(response.body.code).toBe(422);
		expect(response.body.message).toBe('Duplicate ' + duplicate.name);
		done();
	});

	test('PUT 200 - success', async (done) => {
		const response = await request.put('/supplier/' + duplicate.name).send({ 
			name: duplicate.name + "updated", 
			address: duplicate.address + "updated", 
			noTelp: duplicate.noTelp + "updated", 
			image: duplicate.image, 
		});
		expect(response.status).toBe(200);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(200);
		expect(response.body.message).toBe('OK');
		done();
	});

	test('DELETE 200 - delete single data', async (done) => {
		const response = await request.delete('/supplier/' + duplicate.name + "updated");
		expect(response.status).toBe(200);
		expect(response.body.success).toBe(1);
		expect(response.body.code).toBe(200);
		expect(response.body.message).toBe('OK');
		done();
	});

});
