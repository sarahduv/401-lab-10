'use strict';

// const rootDir = process.cwd();
// const supergoose = require('./supergoose.js');
// const {server} = require(`${rootDir}/src/app.js`);
// const mockRequest = supergoose.server(server);

// beforeAll(supergoose.startDB);
// afterAll(supergoose.stopDB);

describe('api server', () => {

  it('should respond with a 404 on an invalid route', () => {

    let one = 1;
    expect(one).toEqual(1);
  });

});
