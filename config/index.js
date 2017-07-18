const env = process.env.NODE_ENV || 'development';

const configs = {
	production: {
		adminAuthToken: 'dFZaGMDEx6Z7',
		database: 'mongodb://admin:yxe3tEcD7tA9@ds133981.mlab.com:33981/bgzstephen-productiv',
		environment: 'production',
		jwtSecret: 'rdLsMzC5zhJj',
		siteAuthToken: 'NY58Avsh8CGe'
	},
	development: {
		adminAuthToken: 'dFZaGMDEx6Z7',
		database: 'mongodb://admin:yxe3tEcD7tA9@ds133981.mlab.com:33981/bgzstephen-productiv',
		environment: 'development',
		jwtSecret: 'rdLsMzC5zhJj',
		siteAuthToken: 'NY58Avsh8CGe'
	}
};

module.exports = configs[env];
