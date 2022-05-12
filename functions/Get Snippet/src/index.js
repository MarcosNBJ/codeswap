const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  let database = new sdk.Database(client);

  client
    .setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.env['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);
 
  let identifier = JSON.parse(req.payload)
  identifier = identifier.id

  let promise = database.getDocument(req.env['COLLECTION_ID'], identifier);
  
  const response = await promise

  res.json(response);
};
