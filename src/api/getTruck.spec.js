'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const handler = require('./getTrucks');

let res;
let models;
beforeEach(() => {
  //fakes
  res = {  
    json: sinon.spy(),
    boom: { badImplementation: sinon.spy() }
  };

  models = {
    Truck: {
      find: sinon.stub().resolves([])
    }
  };

});

describe('Get truck handler', () => {

  it('Should call to find truck model to get all connected trucks', async () => {
    await handler(models)({},res);
    expect(models.Truck.find.calledOnce).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it('Should fail when find method of Truck model fails', async () => {
    models.Truck.find = sinon.stub().rejects();
    
    await handler(models)({},res);    
    expect(models.Truck.find.calledOnce).to.be.true;
    expect(res.boom.badImplementation.calledOnce).to.be.true;
  })
});