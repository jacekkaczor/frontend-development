import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Leaderboard } from '../lib/collection';


Meteor.startup(function() {
  Session.set("sort_order", {score: -1, name: 1});
});

Template.body.helpers({
  players() {
    return Leaderboard.find({}, { sort: Session.get("sort_order") }).map(function(obj, index) {
      obj.rank = index + 1;
      return obj;
    });
  }
});

Template.body.events({
  'click .form-check-input': function() {
    Session.set("sort_order", {score: event.target.id === 'asc' ? -1 : 1, name: 1});
  }
});

Template.add.events({
  'submit #add-form': function() {
    event.preventDefault();
    
    const target = event.target;
    const name = target.name.value;

    Leaderboard.insert({
      name,
      score: 0
    });

    Session.set("selected_player", null);
    target.name.value = '';
    $('#addModal').modal('hide');
    return false;
  }
});

Template.player.selected = function () {
  const selected = Session.equals("selected_player", this._id);
  const upvote = Session.equals("vote", 'upvote');
  return selected ? (upvote ? "list-group-item-success" : "list-group-item-danger") : '';
};

Template.player.events({
  'click .delete-player': function() {
    Leaderboard.remove(this._id);
    return false;
  },

  'click .vote-player': function() {
    Leaderboard.update(this._id, { $inc: {score: event.target.id === 'upvote' ? 1 : -1}});    
    Session.set("selected_player", this._id);
    Session.set("vote", event.target.id);
    return false;
  }
});