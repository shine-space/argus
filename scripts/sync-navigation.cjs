const {build} = require('./shared-site.cjs');

build().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
