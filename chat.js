Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.messages.messages = function () {
    return Messages.find({}, {sort: {time: -1}});
  }

  Template.entryfield.events = {
    'keydown #message': function () {
      if (event.which == 13) {
        var name = $('#name').val();
        var message = $('#message').val();
        if (name != '' && message != '') {
          Messages.insert({
            name: name,
            message: message,
            time: Date.now()
          });
        }
        $('#name').val('');
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
