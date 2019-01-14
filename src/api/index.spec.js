'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const models = {};
const socket = {};
const router = {
    get: sinon.spy(),
    post: sinon.spy()
};

const routes = require('./index')(router, models, socket);
routes.register();

describe('Routes registration', () => {

    it('Should register GET /trucks route', () => {
        expect(router.get.calledWith('/trucks')).to.be.true;
    });

    it('Should register POST /status-event route', () => {
        expect(router.post.calledWith('/status-event')).to.be.true;
    });
});
