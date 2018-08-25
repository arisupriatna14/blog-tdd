require('dotenv').config()
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
chai.use(chaiHttp);

describe('Comment', function() {
  const token = 'INPUT_TOKEN_LOGIN_HERE'
  
  it('GET /comments/:id should return data comment by article id', function(done) {
    chai
      .request('http://localhost:3030')
      .get('/comments/5b7ffb91bd131c51d25123b4')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body.result[0]).to.have.property('comment')
        expect(res.body.result[0]).to.have.property('user')
        expect(res.body.result[0]).to.have.property('article')
        console.log(res.body)
        done()
      })
  })
  it('POST /comments should return object new comments', function(done) {
    chai
      .request('http://localhost:3030')
      .post('/comments')
      .set('Authorization', token)
      .send({
        comment: 'Testing Comment',
        articleId: '5b7ffb91bd131c51d25123b4'
      })
      .end(function(err, res) {
        expect(res).to.have.status(201)
        expect(res.body.result).to.be.a('object')
        expect(res.body.result).to.have.property('comment')
        expect(res.body.result).to.have.property('user')
        expect(res.body.result).to.have.property('article')
        console.log(res.body)
        done()
      })
  })
  it('DELETE /comments/:id should return object', function(done) {
    chai
      .request('http://localhost:3030')
      .delete('/comments/5b80dbe554fb0a0e278a2836')
      .set('Authorization', token)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.a('object')
        done()
      })
  })
})