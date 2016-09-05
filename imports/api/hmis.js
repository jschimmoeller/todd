
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const HMIS = new Mongo.Collection('hmis');

Meteor.methods({
 'hmis.insert'(record) {
   check(record, {hmisId: Number, firstname: String, middleInitial: Match.Maybe(String),
     lastname: String, race: Match.Where(function(r){
       if (r && r.trim().length > -1 ){
          return ['w', 'b','h'].indexOf(r.trim()) > -1
       } else {
         return true;
       }
     }), gender: Match.OneOf('M', 'F'),
     dob: Match.Maybe(Date), firstVisit: Match.Maybe(Date)});

   HMIS.insert({
     ...record,
     createdAt: new Date(),
     modifiedAt: new Date()
   });
 },
 'hmis.remove'(id) {
   check(id, String);

   HMIS.remove(id);
 },
 'hmis.update'(id, record) {
   check(id, String);
   delete record._id;
   record.modifiedAt = new Date();
   check(record, {hmisId: Number, firstname: String, middleInitial: Match.Maybe(String),
     lastname: String, race: Match.Where(function(r){
       if (r && r.trim().length > -1 ){
          return ['w', 'b','h'].indexOf(r.trim()) > -1
       } else {
         return true;
       }
     }), gender: Match.OneOf('M', 'F'),
     dob: Match.Maybe(Date), firstVisit: Match.Maybe(Date), createdAt: Date, modifiedAt: Date });

   HMIS.update(id, { $set: { ...record, modifiedAt: new Date() } });
 },
});
