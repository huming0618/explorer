'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.101.53.11:9527"',
  //BASE_API: '"http://dev-api.qmoon.com"',
})
