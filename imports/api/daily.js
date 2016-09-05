
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

   Daily.update(id, { $set: { hmis, services, modifiedAt: new Date() } });
 },
 'daily.findToday'(hmisId) {
   check(hmisId, Number);
   //TODO fix validation

   let today = new Date();
   today.setHours(0);
   today.setMinutes(0);
   today.setSeconds(0);
   let tomorrow = new Date();
   tomorrow.setDate(today.getDate() + 1 );
   tomorrow.setHours(0);
   tomorrow.setMinutes(0);
   tomorrow.setSeconds(0);

   const x =  Daily.find({ createdAt: {
     $gte: today,
     $lt: tomorrow
   }, "hmis.hmisId": hmisId }).fetch();
   if (x.length > 0){
     return x[0];
   } else {
     return undefined;
   }
 },
});
