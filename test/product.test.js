import request from 'supertest';
import app from '../src/server'

describe('Testing the API on /product and /health-check', () => {
  test('get /health-check deve retornar 200', async () => {
    const res = await request(app).get('/health-check')

    expect(res.status).toBe(200)
  })

  test('get /product', async () => {
    const products = await request(app).get('/product')
    expect(products.status).toBe(200)
    expect(Array.isArray(products.body)).toBeTruthy()
  })

  test('get /product/6 to get product info', async () => {
    const expectedResponse = {
      "productId": 6,
      "name": "notebook ab0c",
      "description": "descrição do produto iha",
      "value": 5000.45,
      "stock": 1,
      "supplierId": 1,
      "info": {
          "_id": "6604c46d17854220f5e76a01",
          "category": "Smartphone",
          "width": "10cm",
          "height": "20cm",
          "depth": "5cm",
          "reviews": [
              {
                  "name": "joao",
                  "description": "top",
                  "_id": "661853e200591e0ca2853ee1"
              },
              {
                  "name": "lala",
                  "description": "test",
                  "_id": "661853e200591e0ca2853ee2"
              },
              {
                  "name": "lala",
                  "description": "test",
                  "_id": "661853ed00591e0ca2853eea"
              },
              {
                  "name": "lala",
                  "description": "test",
                  "_id": "661854063f05c1fb46a49611"
              },
              {
                  "name": "lala",
                  "description": "test",
                  "_id": "6618540c3f05c1fb46a4961f"
              }
          ],
          "productId": 6
      }
  }
    const response = await request(app).get('/product/6')
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(expectedResponse)
  })

  test('post /product and get the product created', async () => {
    const post = await postProduct()
    expect(post.status).toBe(201)
    const productId = post.body.productId
    const expectedResponse = {
      productId,
      "name": "notebook teste",
      "description": "descrição do produto iha",
      "value": 5000.45,
      "stock": 50,
      "supplierId": 1,
      "info": null
    }
    const getProduct = await request(app).get(`/product/${productId}`)
    expect(getProduct.body).toMatchObject(expectedResponse)
  })

  test('post product with invalid payload', async () => {
    const payload = {
      "name": "notebook teste",
      "description": "descrição do produto iha",
      "value": 5000.45,
      "stock": 50
    }
    const post = await request(app).post('/product/').send(payload)
    expect(post.status).toBe(400)
    expect(post.body).toHaveProperty("error")
  })

  test('Deleting a wrong product', async () => {
    const response = await request(app).delete('/product/454554454554545445454')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("error")
  })

  test('Deleting a valid product', async  () => {
    const product = await postProduct()
    const deleteRequest = await request(app).del(`/product/${product.body.productId}`)
    expect(deleteRequest.status).toBe(200)
    expect(deleteRequest.body).toHaveProperty("message")
  })

  test('get /product/info/all', async () => {
    const products = await request(app).get('/product/info/all')
    expect(products.status).toBe(200)
    expect(Array.isArray(products.body)).toBeTruthy()
  })

  test('POST /product/info posting a wrong info product', async () => {
    const products = await request(app).post('/product/info/')
    expect(products.status).toBe(400)
    expect(products.body).toHaveProperty("error")
  })
  test('POST /product/info posting a valid product info', async () => {
    const payload = {
      productId: 6,
      category: 'String',
      width: 'String',
      height: 'String',
      depth: 'String',
      reviews: [
        {name: 'test', description: 'test'}
      ]
    }
    const products = await request(app).post('/product/info/').send(payload)
    expect(products.status).toBe(201)
    expect(products.body).not.toHaveProperty("error")
    expect(products.body).toEqual({})
  })

  
  test('PUT /product/info/ errors', async () => {
    const productId = -1;
    const response = await request(app).put("/product/info/").send({productId})
    expect(response.status).toBe(404)
    const response2 = await request(app).put("/product/info/").send({})
    expect(response2.status).toBe(400)
    expect(response2.body).toHaveProperty("error")
  })
  test('PUT /product/info  updating an existing product', async () => {
    const product = {
      "productId": 1,
      "name": "notebook ghj",
      "description": "descrição do produto iha",
      "value": 5000.45,
      "stock": 50,
      "supplierId": 1,
      "info": null
    }
    const response = await request(app).put("/product/info/").send(product)
    expect(response.status).toBe(200)
  })
})

function getCorrectPayload () {
  return {
    "name": "notebook teste",
    "description": "descrição do produto iha",
    "value": 5000.45,
    "stock": 50,
    "supplierId": 1
  }
}

async function postProduct() {
  const payload = getCorrectPayload()
  
  return await request(app).post('/product/').send(payload)
}