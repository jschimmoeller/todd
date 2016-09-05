
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Services = new Mongo.Collection('services');


Meteor.methods({
 'services.insert'(title, featureCode) {
   console.log()
   check(title, String);
   check(featureCode, String);


   Services.insert({
     title,
     featureCode,
     createdAt: new Date(),
     modifiedAt: new Date()
   });
 },
 'services.remove'(serviceId) {
   check(serviceId, String);

   Services.remove(serviceId);
 },
 'services.update'(serviceId, title, featureCode ) {
   check(serviceId, String);
   check(title, String);
   check(featureCode, String);


   Services.update(serviceId, { $set: { title, featureCode, modifiedAt: new Date() } });
 },
});
