const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/app');

const {
  productByID,
  allProducts,
} = require('./mocks/productsControllerMock');

describe('Teste de integração de products', function () {
  it('Get todos os produtos', async function () {
    const response = await chai
      .request(app)
      .get('/products')

    expect(response.status).to.be.equal(200);
  });
  it('Get produto por ID', async function () {
    const response = await chai
      .request(app)
      .get('/products/1')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productByID);
  });
  it('Get produto que não existe', async function () {
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
});