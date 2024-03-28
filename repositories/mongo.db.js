import mongodb from "mongodb"

export function getClient () {
  const uri =  process.env.DB_MONGO
  return new mongodb.MongoClient(uri)
}
