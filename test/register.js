require('dotenv').config()
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
chai.use(chaiHttp)

const User = require('../models/user')

describe('Register and Login', function() {
  var token = ''
  after(function(done) {
    User.collection.drop()
    done()
  })

  it ('POST /register should return object new user', function(done) {
    chai
      .request('http://localhost:3030')
      .post('/users/register')
      .send({
        username: 'ari supriatna',
        email: 'arisupriatna@gmail.com',
        password: 'aaarrriii'
      })
      .end(function(err, res) {
        expect(res).to.have.status(201)
        expect(res.body.result).to.be.a('object')
        expect(res.body.result).to.have.property('username')
        expect(res.body.result).to.have.property('email')
        expect(res.body.result).to.have.property('password')
        done()
      })
  })

  it('POST /login should return object user login', function(done) {
    chai
      .request('http://localhost:3030')
      .post('/users/login')
      .send({
        email: 'arisupriatna@gmail.com',
        password: 'aaarrriii'
      })
      .end(function(err, res) {
        token = res.body.token
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        done()
      })
  })

  it('POST /articles should return object new article', function(done) {
    chai
      .request('http://localhost:3030')
      .post('/articles')
      .set('Authorization', token)
      .send({
        title: 'Learn Vuejs',
        author: 'Ari Supriatna',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
      .end(function(err, res) {
        expect(res).to.have.status(201)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('GET /articles should return all data article', function(done) {
    chai
      .request('http://localhost:3030')
      .get('/articles')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body.result).to.be.a('array')
        expect(res.body.result[0]).to.have.property('title')
        expect(res.body.result[0]).to.have.property('author')
        expect(res.body.result[0]).to.have.property('content')
        done()
      })
  })
})