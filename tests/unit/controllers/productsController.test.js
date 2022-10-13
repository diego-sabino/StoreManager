const chai = require('chai');
const chaiHttp = require('chai-http');
const { runSeed, connect } = require('../../../__tests__/_utils');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');

const {
  productByID,
} = require('./mocks/productsControllerMock');

describe('Testes de integração de Products', function () {
  beforeEach(async () => await runSeed());
  afterEach(async () => await connect().end());
  it('Será validado que é possível listar todos os produtos', async function () {
    const response = await chai
      .request(app)
      .get('/products')

    expect(response.status).to.be.equal(200);
  });
  it('Será validado que é possível listar um produto pelo ID', async function () {
    const response = await chai
      .request(app)
      .get('/products/1')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productByID);
  });
  it('Será validado que não é possível listar um produto com o ID inexistente', async function () {
    const response = await chai
      .request(app)
      .get('/products/999')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
  });
  it('Será validado que é possível criar um novo produto', async function () {
    const response = await chai
      .request(app)
      .post('/products')
      .send({
        name: 'Júpiter',
      });

    expect(response.status).to.be.equal(201);
  });
  it('Será validado que não é possível criar um novo produto com name inválido', async function () {
    const response = await chai
      .request(app)
      .post('/products')
      .send({
        name: 'a',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
   it('Será validado que é possível deletar um produto pelo ID', async function () {
    const response = await chai
      .request(app)
      .delete('/products/1')

    expect(response.status).to.be.equal(204);
    expect(response.body).to.be.deep.equal({});
   });
  it('Será validado que não é possível deletar um produto com o ID inexistente', async function () {
    const response = await chai
      .request(app)
      .delete('/products/363187')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: "Product not found" });
  });
  it('Será validado que não é possível editar um produto inexistente', async function () {
    const response = await chai
      .request(app)
      .put('/products/363187')
      .send({ "name": "zephyr664" })

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: "Product not found" });
  });
  it('Será validado que é possível editar um produto pelo name', async function () {
    const response = await chai
      .request(app)
      .put('/products/1')
      .send({ "name": "zephyr664" })

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({id: 1, name: "zephyr664"});
  });
  it('Será validado que é possível buscar um produto pelo name', async function () {
    const response = await chai
      .request(app)
      .get('/products/search?q=M')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal([{id: 1, name: "Martelo de Thor"}]);
  });
  it('Será validado que não é possível buscar um produto inexistente', async function () {
    const response = await chai
      .request(app)
      .get('/products/search?q=9')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: "Product not found" });
  });
});