'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const handler = require('./sendStatusEvent');

let res;
let socket;
beforeEach(() => {
  //fakes
  res = {  
    status: sinon.stub().returns({
      json: sinon.spy(),
    }),
    boom: { badImplementation: sinon.spy() }
  };

  socket = {
    emit: sinon.spy()
  };

});

describe('Send status event handler', () => {

  it('Should call to socket emit for send a new event to all drivers', async () => {
    await handler(socket)({},res);
    expect(socket.emit.calledOnce).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
  });

  it('Should fail when socket emit method fails', async () => {
    socket.emit = sinon.stub().throws(new Error());
    
    await handler(socket)({},res);    
    expect(socket.emit.calledOnce).to.be.true;
    expect(res.boom.badImplementation.calledOnce).to.be.true;
  })
});