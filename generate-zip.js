var zip = require("cross-zip");
var path = require("path");
var fs = require("fs-extra");

var source = path.join(__dirname);

// copy source into temp folder without node_modules
var temp = path.join(__dirname, "../temp");
// delete temp folder if it exists
if (fs.pathExistsSync(temp)) {
  fs.removeSync(temp);
}
fs.copySync(source, temp, {
  filter: function (src, dest) {
    return !src.includes("/node_modules") && !src.includes("/.next");
  },
});

// zip temp folder
var destination = path.join(__dirname, "../todo-app-submission.zip");
zip.zipSync(temp, destination);
