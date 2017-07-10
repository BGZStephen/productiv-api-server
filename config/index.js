const env = process.env.NODE_ENV || "development"

const configs = {
  production: {
    database: 'mongodb://admin:yxe3tEcD7tA9@ds133981.mlab.com:33981/bgzstephen-productiv',
    environment: "production"
  },
  development: {
    database: 'mongodb://admin:yxe3tEcD7tA9@ds133981.mlab.com:33981/bgzstephen-productiv',
    environment: "development"
  }
}

module.exports = configs[env]
