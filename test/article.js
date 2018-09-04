require('dotenv').config()
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
chai.use(chaiHttp);

const Article = require('../models/article')
const User = require('../models/user')

describe('Article', function() {
  
  beforeEach(function(done) {
    mongoose.connect(process.env.MONGODB_TEST_URI, { useNewUrlParser: true }, function() {
      Article.create({
        title: 'Learn Vuejs',
        author: 'Ari Supriatna',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
      .then(result => {
        console.log('create article from beforeEach ===>', result)
      })
      .catch(err => {
        console.log(err)
      })
      done()
    })
  })

  after(function(done) {
    Article.collection.drop()
    // User.collection.drop()
    done()
  })
  var token = ''

  it ('POST /register should return object new user', function(done) {
    chai
      .request('http://localhost:3030')
      .post('/users/register')
      .send({
        username: 'ari supriatna',
        email: 'arisupriatna703@gmail.com',
        password: '112233'
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
        email: 'arisupriatna703@gmail.com',
        password: '112233'
      })
      .end(function(err, res) {
        token = res.body.token
        console.log('token login =============>', token)
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        done()
      })
  })

  it('POST /articles should return object new article', function(done) {
    console.log('token dari post article =>', token)
    chai
      .request('http://localhost:3030')
      .post('/articles')
      .set('Authorization', token)
      .send({
        title: 'Learn React Native',
        author: 'Ari Supriatna',
        content: 'Learn React Native blalalallalaa'
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
        console.log(res.body)
        expect(res.body.resultArr).to.be.a('array')
        expect(res.body.resultArr[0]).to.have.property('title')
        expect(res.body.resultArr[0]).to.have.property('author')
        expect(res.body.resultArr[0]).to.have.property('content')
        done()
      })
  })

  it('DELETE /articles/:id should return object', function(done) {
    chai
      .request('http://localhost:3030')
      .delete('/articles/5b7b031ed39444919ce8d316')
      .set('Authorization', token)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.a('object')
        done()
      })
  })
  
  it('PUT /articles/:id should return object', function(done) {
    chai
      .request('http://localhost:3030')
      .put('/articles/5b7ae858970f5e792d426435')
      .set('Authorization', token)
      .send({
        title: 'Learn Vuejs Part 2',
        author: 'Ari Supriatna',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.a('object')
        done()
      })
  })
})