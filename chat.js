Messages = new Meteor.Collection('messages');
Boards = new Meteor.Collection('boards');

if (Meteor.isClient) {
  fadeEffect = function (instance) {
      $(instance.firstNode).hide();
      $(instance.firstNode).fadeIn();
  }

  CURRENT_BOARD = function () { return "boardID" }

  boardNameIsValid = function (newBoardName) {
    return (newBoardName != '') && (Boards.findOne({name: newBoardName}, {}) == undefined)
  }

  Template.boards.boards = function () {
    return Boards.find({}, {sort: {name: -1}});
  }

  Template.messages.messages = function () {
    return Messages.find({boardID: Session.get('boardID')}, {sort: {name: -1}});
  }

  Template.currentBoard.currentBoard = function () {
    return Session.get(CURRENT_BOARD());
  }

  Template.currentBoard.rendered = function () {
    fadeEffect(this);
  }

  Template.messages.rendered = function () {
    fadeEffect(this);
  }

  Template.boards.events = {
    'click .board-name-display-item' : function (event) {
      var nextName = event.currentTarget.innerHTML;
      Session.set(CURRENT_BOARD(), nextName);
    }
  }

  Template.boardEntry.events = {
    'keydown #board-name' : function () {
      if (event.which == 13) {
        var name = $('#board-name').val();
        if (boardNameIsValid(name)) {
          Boards.insert({
            name: name,
            time: Date.now(),
          });
          Session.set(CURRENT_BOARD(), name);
        }
        $('#board-name').val('');
      }
    }
  }

  Template.entryField.events = {
    'keydown #message': function () {
      if (event.which == 13) {
        var name = $('#name').val();
        var message = $('#message').val();
        if (name != '' && message != '') {
          Messages.insert({
            name: name,
            message: message,
            time: Date.now(),
            boardID: Session.get(CURRENT_BOARD())
          });
        }
        $('#message').val('');
      }
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
