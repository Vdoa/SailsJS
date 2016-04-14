/**
 * Automobil.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

		proizvodjac : {
  		type :'string',
  		required: true
  	},

		model : {
  		type :'string',
  		required: true
  	},
  		boja : {
  		type :'string',
  		required: true
  	},
  		tehnickiPregled : {
  		type : 'date'
  	},
  		brojMjesta : {
  		type :'integer',
  		defaultsTo: 4
  		
  	},
  	 	kilometraza: {
  		type: 'integer'
  	},
  		prenos: {
  		type: 'string',
  		enum:['automatik', 'manuelno'],
      	required: true

  	},
  		gorivo: {
  		type: 'string',
  		enum:['dizel', 'benzin','elektro', 'voda'],
      	required: true
  	},
  		kubikaza: {
  		type: 'integer',
       	required: true

  	}




  }
};
