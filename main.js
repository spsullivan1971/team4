$(document).ready(function(){

  page.init();

});

var page ={

  init: function(arguments){
    page.initStyling();
    page.initEvents();
  },

  initStyling: function(arguments){
    page.loadMessages();
    // page.loadTemplate('username', USERNAME DATA, $('.handleBar'));
  },

  initEvents: function(arguments){
    $('.chatBar').on('keypress', chatTextBox, page.enterPress);
  }

  url: "http://tiy-fee-rest.herokuapp.com/collections/spacechat",

  loadMessages: function () {
    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        console.log("Successfully loaded data");
        page.addAllMessages(data);
      },
      error: function (err) {
        console.log("Error: ", err)
      }
    });
  },

  createMessage: function (newMessage) {
    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {
        page.addOneMessage(data);
      },
      error: function (err) {
        console.log("Error occurred: ", err);
      }
    });
  },

  addMessage: function (username, input) {
    var newMessage = {
        username: username,
        message: input
        }
    page.createMessage(newMessage);

    $('input').val("");
  },

  addOneMessage: function(message){
    page.loadTemplate("newMessage", message, $('.spaceZone'));
  },

  addAllMessages: function(listOfMessages){
    _.each(listOfMessages, page.addOneMessage);
  },

  loadTemplate: function(tmplName, data, $target){
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  },

  getTemplate: function(name){
   return templates[name];
 },

 enterPress: function(event){
    if(event.keyCode === 13){
    event.preventDefault();
    page.addMessage($('input[class="chatTextBox"]').val());
    }
  }

};
