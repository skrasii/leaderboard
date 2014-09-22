PlayersList = new Meteor.Collection('players');
playerId = this._id;

//CLIENT SIDE//
if (Meteor.isClient) {
    
  Meteor.subscribe('thePlayers');
    
  Template.leaderboard.player = function() {
    var currentUserId = Meteor.userId();
    return PlayersList.find({createdBy: currentUserId}, { sort: {score: -1}});
  }
  Template.leaderboard.totalPlayers = function() {
    var currentUserId = Meteor.userId();
    return PlayersList.find({createdBy: currentUserId}).count();
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
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: myTemplate.find('#playerName').value,
        createdBy: currentUserId
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

//SERVER SIDE//
if (Meteor.isServer) {
  //Meteor.startup(function () {
  //});
    Meteor.publish('thePlayers', function(){
        return PlayersList.find();
    });
    
}
