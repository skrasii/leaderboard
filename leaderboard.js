PlayersList = new Meteor.Collection('players');
playerId = this._id;

if (Meteor.isClient) {
  Template.leaderboard.player = function() {
    return PlayersList.find({}, { sort: {score: -1}});
  }
  Template.leaderboard.totalPlayers = function() {
    return PlayersList.find().count();
  }
  Template.leaderboard.events({
    'click li': function(){
       
       if (Session.get('selectedPlayer') && Session.get('selectedPlayer') ===  this._id)
           // deselection
           Session.set('selectedPlayer', 0);
       else
            // selection 
            Session.set('selectedPlayer', this._id);
        
     },

    'click #increment': function(){
       console.log("increment clicked!");
      if (Session.get('selectedPlayer')) 
        PlayersList.update({_id: Session.get('selectedPlayer')}, {$inc: {score: 4}});
     },
     
    'click #decrement': function(){
       console.log("decrement clicked!");
       if (Session.get('selectedPlayer'))
         PlayersList.update({_id: Session.get('selectedPlayer')}, {$inc: {score: -4}});
     },

     'click #deletePlayer': function(){
       console.log("detele clicked!");
       if (Session.get('selectedPlayer'))
         PlayersList.remove({_id: Session.get('selectedPlayer')});
         console.log("user removed");
     }
 });
  
  Template.addPlayerForm.events({
    'submit form': function(myEvent, myTemplate) {
      myEvent.preventDefault();
      PlayersList.insert({
        name: myTemplate.find('#playerName').value
      });
      myTemplate.find('#playerName').value = "";
    }
  });

  Template.leaderboard.selectedClass = function(){
    if (Session.get('selectedPlayer') === this._id) {
      return 'selected';
    }
  }
  Template.leaderboard.marked = function() {
    if (Session.get('selectedPlayer')) {
      return PlayersList.findOne({_id: Session.get('selectedPlayer')});
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
