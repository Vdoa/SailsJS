/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		firstName: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
			required: true
		},
		birthDate: {
			type: 'date',
			required: true
		},
		username: {
			type: 'string',
			required: true,
			alphanumeric: true,
			maxLength: 20,
			unique: true
		},
		email: {
			type: 'string',
			email: true,
			required: true,
			unique: true
		},
		gender: {
			type: 'string',
			enum: ['Male', 'Female', 'Other'],
			required: true

		},
		image: {
			type: 'string',
			defaultsTo: 'http://worldartsme.com/faceless-people-clipart.html#gal_post_83148_faceless-people-clipart-1.jpg'

		},
		country: {
			type: 'string',
			enum: ['Albanija', 'Bosna', 'Srbija', 'Makedonija', 'Hrvatska']

		},
		automobili: {
			collection: 'automobil',
			via: 'userOwner'
		},
		user_balance: {
			collection: 'balance',
			via: 'userOwner'
		}
	}
};

