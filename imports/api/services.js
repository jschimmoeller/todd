
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Services = new Mongo.Collection('services');


Meteor.methods({
 'services.insert'(title, featureCode, hq=false) {
   check(title, String);
   check(featureCode, String);
   let hasQuantity = false;
   if (hq=='true'){
     hasQuantity=true;
   }
   Services.insert({
     title,
     featureCode,
     hasQuantity,
     createdAt: new Date(),
     modifiedAt: new Date()
   });
 },
 'services.remove'(serviceId) {
   check(serviceId, String);

   Services.remove(serviceId);
 },
 'services.update'(serviceId, title, featureCode, hq=false ) {
   check(serviceId, String);
   check(title, String);
   check(featureCode, String);
   let hasQuantity = false;
   if (hq=='true'){
     hasQuantity=true;
   }

   Services.update(serviceId, { $set: { title, featureCode, hasQuantity, modifiedAt: new Date() } });
 },
});
