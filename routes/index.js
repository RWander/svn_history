const router = require('koa-router')();
const BranchController = require('../controllers/BranchController');

const branchController = new BranchController();

router.get('/', function *(next) {
  const branches = yield branchController.getBranches();

  yield this.render('index', {
    title: JSON.stringify(branches)
  });
});

router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
