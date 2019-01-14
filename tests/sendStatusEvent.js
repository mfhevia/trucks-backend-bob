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

describe('POST /status-event', () => {
  it('Should send an new status event to all the drivers', (done) => {
    request(server)
      .post('/status-event')
      .expect(201)
      .then((response) => {
        expect(response.body.message).to.exist;
        done();
      });
  });
});
