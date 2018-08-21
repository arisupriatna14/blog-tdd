require('dotenv').config()
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
chai.use(chaiHttp);

const Article = require('../models/article')

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
    done()
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