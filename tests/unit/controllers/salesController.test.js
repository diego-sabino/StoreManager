const chai = require('chai');
const chaiHttp = require('chai-http');
const { runSeed, connect } = require('../../../__tests__/_utils');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');

describe('Testes de integração de Sales', function () {
  beforeEach(async () => await runSeed());
  afterEach(async () => await connect().end());
  it('Será validado que é possível listar todas as vendas', async function () {
    const response = await chai
      .request(app)
      .get('/sales')

    expect(response.status).to.be.equal(200);
  });
  it('Será validado que é possível listar uma venda com o ID', async function () {
    const response = await chai
      .request(app)
      .get('/sales/1')
    const [{ date, productId, quantity }] = response.body;
    expect(response.status).to.be.equal(200);
    expect(date).to.be.a('string');
    expect(productId).not.to.be.equal(undefined);
    expect(quantity).not.to.be.equal(undefined);
  });
  it('Será validado que não é possível listar uma venda com o ID inexistente', async function () {
    const response = await chai
      .request(app)
      .get('/sales/999')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Sale not found' });
  });
  it('Será validado que não é possível criar uma venda sem o campo productId', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{ product: 1, quantity: 1 }]);
    
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"productId" is required' });
  });
    it('Será validado que não é possível criar uma venda sem o campo quantity', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{ productId: 1, quantit: 1 }]);
      
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"quantity" is required' });
  });
   it('Será validado que é possível criar uma venda', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{ productId: 1, quantity: 1 }]);
     
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({id: 3, itemsSold: [{ productId: 1, quantity: 1 }]
  });
  });
   it('Será validado que é possível deletar uma venda pelo ID', async function () {
    const response = await chai
      .request(app)
      .delete('/sales/1')
     
     expect(response.status).to.be.equal(204);
     expect(response.body).to.be.deep.equal({});
   });
   it('Será validado que não é possível deletar uma venda com o ID inexistente', async function () {
     const response = await chai
      .request(app)
      .delete('/sales/363187')
     
     expect(response.status).to.be.equal(404);
     expect(response.body).to.be.deep.equal({ message: "Sale not found" });
   });
   it('Será validado que não é possível editar uma venda com o ID inexistente', async function () {
     const response = await chai
      .request(app)
      .put('/sales/687')
      .send([{ productId: 1, quantity: 10 }])
     
     expect(response.status).to.be.equal(404);
     expect(response.body).to.be.deep.equal({ message: "Sale not found" });
   });
   it('Será validado que é possível editar uma venda pelo ID', async function () {
     const response = await chai
      .request(app)
      .put('/sales/1')
      .send([{ productId: 1, quantity: 10 }])
  
     expect(response.status).to.be.equal(200);
     expect(response.body).to.be.deep.equal({ saleId: '1', itemsUpdated: [{ productId: 1, quantity: 10}]});
   });
});