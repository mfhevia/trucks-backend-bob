'use strict';

const { expect } = require('chai');
const request = require('supertest');
const config = require('getconfig');
const server = require('../server');
const db = require('../db');

before(async () => {
  const { connection } = await db.connect(process.env.DB_URL || config.db.url);
  await connection.collections.trucks.deleteMany();
});

after(() => {
  db.close();
});

describe('GET /trucks', () => {
  it('Should find all connected trucks', (done) => {
    request(server)
      .get('/trucks')
      .expect(200)
      .then((response) => {
        expect(response.body.trucks).to.be.an('array');
        done();
      });
  });
});
