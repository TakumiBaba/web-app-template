import assert from 'power-assert';

describe('index', (done)=> {
  it('hello === hello', (done)=> {
    assert('hello' === 'hello');
    done();
  });
});
