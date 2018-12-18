const { exec } = require("child_process");
const { app } = require("electron").remote;
const path = require("path");

const paths = {
  nodePath: "",
  yarnPath: ""
};

function checkIfNodeAvailable() {
  return new Promise(resolve =>
    exec("node -v", (err, version) => {
      if (err) {
        resolve(null);
      }

      resolve(version);
    })
  ).then(version => {
    if (version) {
      // later check if it's meeting the minimum requirements - if not warn user & load bundled node
      // for now always use system node if available
      console.log("found node version", version);
      return paths;
    }

    // use bundled yarn & node
    nodePath = path.join(app.getAppPath(), "./node_modules", "node", "bin");
    yarnPath = path.join(app.getAppPath(), "./node_modules", "yarn", "bin");

    // add our node version to path (so yarn can find it)
    window.process.env.PATH = nodePath; // replace everything to be sure that this is the only version of node in path
    return {
      nodePath,
      yarnPath
    };
  });
}

module.exports = checkIfNodeAvailable;
