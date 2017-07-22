const env = process.env.NODE_ENV || 'development';

const configs = {
	production: {
		adminAuthToken: $ADMIN_AUTH_TOKEN,
		database: $DATABASE_URL,
		environment: 'production',
		jwtSecret: $JWT_SECRET,
		siteAuthToken: $SITE_AUTH_TOKEN
	},
	development: {
		adminAuthToken: $ADMIN_AUTH_TOKEN,
		database: $DATABASE_URL,
		environment: 'production',
		jwtSecret: $JWT_SECRET,
		siteAuthToken: $SITE_AUTH_TOKEN
	}
};

module.exports = configs[env];
