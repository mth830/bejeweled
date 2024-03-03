const { expect } = require('chai');


const Bejeweled = require("../class/bejeweled.js");
describe ('Bejeweled',()=>{
  let bejeweled = new Bejeweled();
  it("should initialize an 8x8 array",()=>{
    
    expect(bejeweled.length).to.equal(8)
    expect(bejeweled[0].length).to.equal(8)
  })
  //expect it to not be missing
  // Add tests for setting up a basic board

  // Add tests for a valid swap that matches 3

  // Add tests for swaps that set up combos

  // Add tests to check if there are no possible valid moves

});

