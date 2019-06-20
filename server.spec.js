const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server'); // this is our first red, file doesn't exist yet

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('index route', () => {

    it('testing get functionalty', async () => {
        const response = await request(server).get('/numbers');
        expect(response.type).toEqual('application/json');
        expect(response.body.data).toBeDefined();
      });

//post
    it('testing post funcitonality', async () => {
        // do a get request to our api (server.js) and inspect the response
        let val = 20;
        let response = await request(server).post('/numbers').send({number: val});
        expect(response.status).toEqual(201);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.includes(val)).toBe(true);

        response = await request(server).post('/numbers').send({number: "hello"});
        expect(response.status).toEqual(400);
        expect(response.body.data).toBeDefined();

        response = await request(server).post('/numbers');
        expect(response.status).toEqual(400);
        expect(response.body.data).toBeDefined();
      });

      //delete
      it('testing delete functionality', async () => {
        // do a get request to our api (server.js) and inspect the response
        let val = 3;
        let response = await request(server).delete('/numbers').send({number: val});
        expect(response.status).toEqual(202);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.includes(val)).toBe(false);

        response = await request(server).delete('/numbers').send({number: "hello"});
        expect(response.status).toEqual(400);
        expect(response.body.data).toBeDefined();

        response = await request(server).delete('/numbers');
        expect(response.status).toEqual(400);
        expect(response.body.data).toBeDefined();
      });

  });
});