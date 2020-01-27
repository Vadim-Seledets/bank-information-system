const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const compiler = webpack(config)
// var http = require('http');
// var fetch = require('node-fetch');

// var api = http.createServer(async function (request, response) {
// 	response.setHeader('Access-Control-Allow-Origin', '*');
// 	response.setHeader('Access-Control-Request-Method', '*');
// 	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
// 	response.setHeader('Access-Control-Allow-Headers', '*');
// 	if (response.method !== 'OPTIONS') {
//     let res = await fetch(request.url.slice(1));
//     let headers = [];
//     res.headers.forEach((value, key) => {
//       headers.push(`${key}: ${value}`);
//     });
//     let content = await res.text();
//     let result = headers.join("\n") + "\n\n\n" + content;
//     response.end(result);
//   }
//   else {
// 		response.writeHead(200);
// 		response.end();
//   }
// });

// api.listen(3334, 'localhost', function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("API is listening at http://localhost:3334.");
// });

const server = new WebpackDevServer(compiler, {
  hot: true,
  // display no info to console (only warnings and errors)
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: {
    // With console colors
    colors: true,
    // add the hash of the compilation
    hash: true,
    // add webpack version information
    version: false,
    // add timing information
    timings: true,
    // add assets information
    assets: false,
    // add chunk information
    chunks: false,
    // add built modules information to chunk information
    chunkModules: false,
    // add built modules information
    modules: false,
    // add also information about cached (not built) modules
    cached: false,
    // add information about the reasons why modules are included
    reasons: false,
    // add the source code of modules
    source: false,
    // add details to errors (like resolving log)
    errorDetails: true,
    // add the origins of chunks and chunk merging info
    chunkOrigins: false,
    // Add messages from child loaders
    children: false,
  },
})

server.listen(3333, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log("Webpack is listening at http://localhost:3333.")
  console.log("Please wait. Building...")
})
