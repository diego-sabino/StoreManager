const chai = require('chai');
const chaiHttp = require('chai-http');
const { runSeed, connect } = require('../../../__tests__/_utils');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');

const {
  saleByID,
  allSales,
} = require('./mocks/salesControllerMock');

describe('Teste de integração de sales', function () {
  beforeEach(async () => await runSeed());
  afterEach(async () => await connect().end());
  it('Requisição get de todas as sales', async function () {
    const response = await chai
      .request(app)
      .get('/sales')

    expect(response.status).to.be.equal(200);
  });
  it('Requisição get de uma sale por ID', async function () {
    const response = await chai
      .request(app)
      .get('/sales/1')
    const [{ date, productId, quantity }] = response.body;
    expect(response.status).to.be.equal(200);
    expect(date).to.be.a('string');
    expect(productId).not.to.be.equal(undefined);
    expect(quantity).not.to.be.equal(undefined);
  });
  it('Requisição get de uma sale que não existe', async function () {
    const response = await chai
      .request(app)
      .get('/sales/999')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Sale not found' });
  });
  it('Será validado que não é possível realizar operações em uma venda sem o campo productId', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{"product": 1,"quantity": 1}]);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"productId" is required' });
  });
    it('Será validado que não é possível realizar operações em uma venda sem o campo quantity', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{"productId": 1,"quantit": 1}]);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"quantity" is required' });
  });
   it('Será validado que é possível criar uma venda', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{ "productId": 1, "quantity": 1 }]);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      "id": 3,
      "itemsSold": [{
        "productId": 1,
        "quantity": 1
      }]
  });
  });
   it('Deletar uma sale', async function () {
    const response = await chai
       .request(app)
       .delete('/sales/1')
     expect(response.status).to.be.equal(204);
     expect(response.body).to.be.deep.equal({});
   });
   it('Deletar uma sale inexistente', async function () {
     const response = await chai
       .request(app)
       .delete('/sales/363187')
     expect(response.status).to.be.equal(404);
     expect(response.body).to.be.deep.equal({ message: "Sale not found" });
   });
});