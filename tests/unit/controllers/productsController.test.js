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
    expect(response.body).to.be.deep.equal(allProducts);
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
});