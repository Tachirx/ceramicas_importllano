const gis = require('g-i-s');

gis('cerámica ITACA sal soluble plain ivory textura', logResults);

function logResults(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(results.slice(0, 3), null, 2));
  }
}
