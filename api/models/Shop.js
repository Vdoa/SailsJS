/**
 * Shop.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		name: {
			type: 'string',
			required: true
		},

		location: {
			type: 'string',
			required: true

		},
		shop_auto: {
			collection: 'automobil',
			via: 'shopOwner'
		},
  		shop_balance:{
          collection: 'balance',
          via: 'shopOwner'
      }
	}
};

