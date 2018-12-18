// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { app } = require("electron").remote;
const { exec } = require("child_process");
const path = require("path");
const checkIfNodeAvailable = require("./checkNode");

const button = document.getElementById("test");

checkIfNodeAvailable().then(paths => {
  const { nodePath, yarnPath } = paths;
  button.addEventListener("click", () => ButtonHandler(nodePath, yarnPath));
});

function ButtonHandler(nodePath, yarnPath) {
  //   const env = {
  //     ELECTRON_RUN_AS_NODE: 1,
  //     ATOM_SHELL_INTERNAL_RUN_AS_NODE: 1
  //   };
  const config = {
    // detached: true,
    // stdio: "ignore"
    // cwd: binaryPath
  };

  const debugEl = document.getElementById("debug");

  console.log(process.execPath, app.getAppPath(), window.process.env.PATH);
  debugEl.innerHTML += "execPath: " + process.execPath;
  debugEl.innerHTML += "\nappPath: " + app.getAppPath() + "\n";
  debugEl.innerHTML += "yarnPath: " + yarnPath;
  debugEl.innerHTML += "\nnodePath: " + nodePath + "\n";

  exec(path.join(nodePath, "node") + " -v", config, (err, version) => {
    debugEl.innerHTML += "version: " + version + "\n";
    console.log("version", version);
  });
  exec(
    `which ${nodePath !== "" ? nodePath + "/" : ""}node`,
    config,
    (err, nodePath) => {
      debugEl.innerHTML += "Node in env. PATH: " + nodePath + "\n";
      console.log("env. path", nodePath);
    }
  );
  exec(path.join(yarnPath, "yarn.cmd") + " -v", config, (err, yarnVersion) => {
    debugEl.innerHTML += "yarn version: " + yarnVersion + "\n";
    console.log("yarn version", yarnVersion);
  });
}
