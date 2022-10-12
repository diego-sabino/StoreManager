const chai = require('chai');
const chaiHttp = require('chai-http');
const { runSeed, connect } = require('../../../__tests__/_utils');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');

const {
  productByID,
  allProducts,
} = require('./mocks/productsControllerMock');

describe('Teste de integração de products', function () {
  beforeEach(async () => await runSeed());
  afterEach(async () => await connect().end());
  it('Requisição get de todos os produtos', async function () {
    const response = await chai
      .request(app)
      .get('/products')

    expect(response.status).to.be.equal(200);
  });
  it('Requisição get de um produto por ID', async function () {
    const response = await chai
      .request(app)
      .get('/products/1')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productByID);
  });
  it('Requisição get de um produto que não existe', async function () {
    const response = await chai
      .request(app)
      .get('/products/999')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
  });
  it('Criação de um novo produto', async function () {
    const response = await chai
      .request(app)
      .post('/products')
      .send({
        name: 'Júpiter',
      });

    expect(response.status).to.be.equal(201);
  });
  it('Criação de um novo produto com o nome inválido', async function () {

    const response = await chai
      .request(app)
      .post('/products')
      .send({
        name: 'a',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ "message": "\"name\" length must be at least 5 characters long" });
  });
   it('Deletar um produto', async function () {

    const response = await chai
      .request(app)
      .delete('/products/1')

    expect(response.status).to.be.equal(204);
    expect(response.body).to.be.deep.equal({});
   });
  it('Deletar um produto inexistente', async function () {

    const response = await chai
      .request(app)
      .delete('/products/363187')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: "Product not found" });
  });
  it('Editar um produto inexistente', async function () {

    const response = await chai
      .request(app)
      .put('/products/363187')
      .send({ "name": "zephyr664" })

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: "Product not found" });
  });
  it('Editar um produto', async function () {

    const response = await chai
      .request(app)
      .put('/products/1')
      .send({ "name": "zephyr664" })

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({"id": 1, "name": "zephyr664"});
  });
});