
const { merge } = require('webpack-merge');
const baseConfig = require('./config/webpack.base');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');

module.exports = (env, args) => {
	let options = baseConfig(env, args);

	if(env.prod){
		options = merge(options, prodConfig(env));
	}else{
		options = merge(options, devConfig);
	}

	return options;
};