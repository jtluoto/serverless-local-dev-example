const dynamodbOptions = (port = 8000) => {
  if (process.env.IS_OFFLINE) {
    // serverless-offline is running => use local options
    return {
      region: "localhost",
      endpoint: `http://localhost:${port}`
    }
  } else {
    // serverless-offline is NOT running => use default options
    return {}
  }
}

module.exports.dynamodbOptions = dynamodbOptions
