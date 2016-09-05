
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Daily = new Mongo.Collection('daily');

Meteor.methods({
 'daily.insert'(hmis, services ) {


   Daily.insert({
     hmis,
     services,
     createdAt: new Date(),
     modifiedAt: new Date()
   });
 },
 'daily.remove'(id) {
   check(id, String);

   Daily.remove(id);
 },
 'daily.update'(id, hmis, services) {
   check(id, String);
   //TODO fix validation

   HMIS.update(id, { $set: { hmis, services, modifiedAt: new Date() } });
 },
});
