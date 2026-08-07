const { image_search } = require('duckduckgo-images-api');

async function test() {
  try {
    const results = await image_search({ query: 'ceramica ITACA Sal soluble plain ivory textura', moderate: true });
    console.log(JSON.stringify(results.slice(0, 3), null, 2));
  } catch (err) {
    console.error(err);
  }
}
test();
