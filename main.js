$(document).ready(function(){

  var currentData = [];
  page.init();
  setInterval(function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        if(data.length !== currentData.length){
        console.log("Successfully loaded new data");
        console.log(data.length);
        console.log(currentData.length);
        $('.textField').empty();
        page.addAllMessages(data);

      }else{
        console.log("this is the else statement")
      }
      },
      error: function (err) {
        console.log("Error: ", err)
      }
    });
  }, 500);

});

var page ={


  init: function(arguments){
    page.initStyling();
    page.initEvents();
    window.onbeforeunload = page.windowLogOut;
  },

  initStyling: function(arguments){
    page.loadMessages();

  },

  initEvents: function(arguments){
    $('.chatBar').on('keypress', '.chatTextBox', page.messageEnterPress);
    $('body').on('keypress', '.usernameTextBox', page.usernameEnterPress);
    $('.textField').on('click', 'a', page.deleteMessage);
  },

  url: "http://tiy-fee-rest.herokuapp.com/collections/spacecandy",

  loginURL: "http://tiy-fee-rest.herokuapp.com/collections/spacecandylogins",

  loadMessages: function () {
    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        console.log("Successfully loaded data");
        page.addAllMessages(data);
        currentData = data;
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

  windowLogOut: function(){
      $.ajax({
        url: page.loginURL + "/" +$('.username').data('id'),
        method: 'DELETE',
        success: function(data){
          console.log("what youre looking for")
        }
      });
      return "are you sure?";
    },

  deleteMessage: function(event){
   event.preventDefault();

   if($(this).parent().siblings('.messageCreator').text() === $('.username').text()){

   $.ajax({
     url: page.url + "/" +$(this).closest('.messageContainer').data('id'),
     method: 'DELETE',
     success: function(data){
       console.log("I work -- deleted")
     }
   });
  }
 },

  addMessage: function (username, input) {
    var newMessage = {
        username: username,
        message: input,
        time: Math.floor((new Date()).getTime() / 1000)
        }
    page.createMessage(newMessage);

    $('input').val("");
  },

  addOneMessage: function(message){
    page.loadTemplate("newMessage", message, $('.textField'));
  },

  addAllMessages: function(listOfMessages){
    _.sortBy(listOfMessages, listOfMessages.time);
    _.each(listOfMessages.reverse(), page.addOneMessage);
  },

  loadTemplate: function(tmplName, data, $target){
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  },

  getTemplate: function(name){
   return templates[name];
 },

 messageEnterPress: function(event){
    if(event.keyCode === 13){
    event.preventDefault();
    page.addMessage($('.username').text(), $('input[class="chatTextBox"]').val());
    $('.textField').animate({ scrollTop: $('.textField')[0].scrollHeight}, 2000);
    }
  },

  usernameEnterPress: function(event){
    if(event.keyCode === 13){
        $.ajax({
          url: page.loginURL,
          method: 'GET',
          success: function (data) {
            usernameArray = _.filter(data, function(el){
              return el.username === $('.usernameTextBox').val();
            });

            if(usernameArray.length > 0){
              alert("Username taken, try again");
            }else{
                $.ajax({
                  url: page.loginURL,
                  method: 'POST',
                  data: { username: $('.usernameTextBox').val() },
                  success: function (data) {
                    event.preventDefault();
                    page.loadTemplate('username',{ username: $('.usernameTextBox').val() }, $('.handleBar'));
                    $('.landingPage').addClass('hide');
                    $('.spaceZone').removeClass('hide');
                    $('.chatBar').removeClass('hide');
                    $('.handleBar').removeClass('hide');
                    $('.textField').animate({ scrollTop: $('.textField')[0].scrollHeight}, 5000);
                    page.addDataIdToUsername();
                  },
                  error: function (err) {
                    console.log("Error occurred: ", err);
                  }
                });
              }
            },
          error: function (err) {
            console.log("Error: ", err)
          }
        });
      }
    },

    addDataIdToUsername: function(){
      $.ajax({
        url: page.loginURL,
        method: 'GET',
        success: function (data) {
          var newUser = _.filter(data, function(el){
            return el.username === $('.username').text();
          });

          $('.handleBar').empty();
          _.each(newUser, function(el){
            page.loadTemplate('usernameId', el, $('.handleBar'));
          });

          }
        });
    }

  // updateUsername: function(oldUserName, newUserName){
  //
  //   _.each(page.currentData(), function(){
  //     if(page.currentData().username === oldUserName){
  //       page.currentData().username = newUserName;
  //
  //       $.ajax({
  //         url: page.url + '/' + itemId,
  //         method: 'PUT',
  //         data: updatedItem,
  //         success: function (data) {
  //
  //         },
  //         error: function (err) {}
  //       });
  //     }
  //   })
  //   }

};
