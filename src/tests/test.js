const should = require('should');
const request = require('request');

var vendorId, itemId;
/* Unit tests for testing server side routes for the listings API */
describe('Backend tests', function() {

  this.timeout(10000);

  it('should be able to retrieve the fridge', function(done) {
    request.get('http://localhost:4040/api/fridge', {}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      vendorId = JSON.parse(res["body"])[0]["_id"];
      should.exist(vendorId)
      done();
    });
  });

  it('should be able to add an item to vendor inventory', function(done) {
    request.post('http://localhost:4040/api/fridge/'+vendorId, 
      {form:{
        name:'Cake',
        desc:'Chocolate Cake',
        price:4.55,
        quantity: 10
      }},
      (err, res, body) => {
      item = JSON.parse(body)["inventory"].slice(-1)[0]
      itemId = item["_id"]
      should.equal(item["name"],"Cake")
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should be to get vendor inventory', function(done) {
    request.get('http://localhost:4040/api/fridge/'+vendorId, {}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      should.exist(itemId);
      done();
    });
  });

  it('should be able to update vendor item', function(done) {
    request.post('http://localhost:4040/api/fridge/'+vendorId+'/'+itemId, 
      {form:{
        quantity: 4
      }}, (err, res, body) => {
        should.not.exist(err);
        should.exist(res);
        item = JSON.parse(body)["inventory"].slice(-1)[0]
        should.equal(item["quantity"],4)
        done();
      });
  });

  it('should be able to get vendor item', function(done) {
    request.get('http://localhost:4040/api/fridge/'+vendorId+'/'+itemId, {}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should be able to get fridge item', function(done) {
    request.get('http://localhost:4040/api/fridge/item/'+itemId, {}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      console.log()
      done();
    });
  });

  it('should be able to add to cart', function(done) {
    request.post('http://localhost:4040/api/cart/'+vendorId, 
    {form:{
      vendorId: vendorId,
      itemId: itemId,
      quantity: 1
    }}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should be able to get cart', function(done) {
    request.get('http://localhost:4040/api/cart/'+vendorId, {}, (err, res, body) => {
      should.equal(JSON.parse(body)[0]["cart"][0]["name"],'Cake')
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should be able to remove from cart', function(done) {
    request.delete('http://localhost:4040/api/cart/'+vendorId+'/'+itemId, {}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });  

  it('should be able to delete vendor item', function(done) {
    request.delete('http://localhost:4040/api/fridge/'+vendorId+'/'+itemId, {}, (err, res, body) => {
      should.not.exist(err);
      should.exist(res);
      itemId = undefined
      done();
    });
  });

  after(function(done) {
      if(itemId && vendorId) {
        request.delete('http://localhost:4040/api/fridge'+vendorId+'/'+itemId, {}, (err, res, body) => {
          if(err) throw err;
          done();
        })
      }
      else {
          done();
      }
  });

});