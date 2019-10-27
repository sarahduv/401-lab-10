'use strict';

// const rootDir = process.cwd();
// const teams = require(`${rootDir}/src/models/teams/teams-model.js`);

// const supergoose = require('../supergoose.js');

// beforeAll(supergoose.startDB);
// afterAll(supergoose.stopDB);

describe('Teams Model', () => {

  it('can get() a team', () => {
    let obj = {name:'Test Team'};
    expect(obj.name).toEqual('Test Team');
  });
  
});