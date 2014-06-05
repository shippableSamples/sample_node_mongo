var superagent = require("superagent"),
    chai = require("chai"),
    expect = chai.expect,
    should = require("should");

describe("Index", function () {
  it("renders HTML", function () {
    superagent.get("http://localhost:3000/")
      .end(function (e, res) {
        (e === null).should.equal(true);
        res.text.should.equal("Hey buddy!");
      });
  });
});

describe("Persistence", function () {
  it("should create a thing", function (done) {
    superagent.get("http://localhost:3000/doobie")
      .end(function (e, res) {
        (e === null).should.equal(true);
        var response = (res.body.indexOf("new") !== -1);
        expect(response).to.equal(false);
        done();
      });
  });
  it("should retrieve a thing", function (done) {
    superagent.get("http://localhost:3000/doobie")
      .end(function (e, res) {
        (e === null).should.equal(true);
        var response = res.body;
        response = response[0];
        response.should.have.property("name", "doobie");
        done();
      });
  });
});
