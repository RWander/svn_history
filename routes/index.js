const router = require('koa-router')();
const BranchController = require('../controllers/BranchController');

const branchController = new BranchController();

router.get('/', function *(next) {
  yield this.render('index', {
    title: JSON.stringify(branchController.getBranches())
  });
});

router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
