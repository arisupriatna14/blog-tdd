require('dotenv').config()
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
chai.use(chaiHttp);

const Article = require('../models/article')

describe('Article', function() {

  // beforeEach(function(done) {
  //   mongoose.connect(process.env.MONGODB_TEST_URI, { useNewUrlParser: true }, function() {
  //     Article.create({
  //       title: 'Learn Vuejs',
  //       author: 'Ari Supriatna',
  //       content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  //     })
  //     done()
  //   })
  // })

  afterEach(function(done) {
    Article.collection.drop()
    done()
  })

  it('POST /articles should return object new article', function(done) {
    chai
      .request('http://localhost:3030')
      .post('/articles')
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
  it('DELETE /articles/:id should return object', function(done) {
    chai
      .request('http://localhost:3030')
      .delete('/articles/5b7b031ed39444919ce8d316')
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