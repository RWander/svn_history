const execa = require('execa');
const Branch = require('../models/Branch');

// consts
const { repository: REPO } = require('../.svn');
const {
  iEI_RELEASES,
  iPEP_RELEASES,
  iEI_TRUNK,
  iPEP_TRUNK,
  iEI_PROJECT,
  iPEP_PROJECT
} = require('../consts');

module.exports = class BranchController {
  constructor() {
  }

  getBranches() {
    return Promise.all([
      this._getBranchesInFolder(iEI_RELEASES),
      this._getBranchesInFolder(iPEP_RELEASES),
    ]).then(values => {
      return [
        new Branch(iEI_TRUNK, `${REPO}/${iEI_TRUNK}`, iEI_PROJECT),
        new Branch(iPEP_TRUNK, `${REPO}/${iPEP_TRUNK}`, iPEP_PROJECT),
        ...[values[0].map(v => new Branch(v, `${REPO}/${v}`, iEI_PROJECT))],
        ...[values[1].map(v => new Branch(v, `${REPO}/${v}`, iPEP_PROJECT))],
      ];
    });
  }

  _getBranchesInFolder(folder) {
    return execa('svn', ['ls', `${REPO}/${folder}`]).then(result => result.stdout.split('\r\n'));
  }

  getBranch(name) {
    // TODO
    // ..
    return name;
  }
};
