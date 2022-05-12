const sdk = require("node-appwrite");
var uniqid = require('uniqid'); 

module.exports = async function (req, res) {
  const client = new sdk.Client();
  let database = new sdk.Database(client);

  client
    .setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.env['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);
 
  const identifier = uniqid.time()
  let snippet = JSON.parse(req.payload)

  snippet.identifier = identifier

  let promise = database.createDocument(req.env['COLLECTION_ID'], identifier, snippet);

  promise.then(function (response) {
      console.log(response);
  }, function (error) {
      console.log(error);
  });

  res.json({id:identifier});
};
