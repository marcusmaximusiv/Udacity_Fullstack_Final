import { performClear } from "../js/app";

test('There is no data after Perform Clear', done => {
    function performClear(data) {
      try {
        expect(data).toBe('');
        done();
      } catch (error) {
        done(error);
      }
    }
  
    fetchData(performClear);
  });
  