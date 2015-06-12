var templates = {};

templates.newMessage = [
  "<ul class = 'messageContainer'>",

  "<li class = 'messageContent' data-id = '<%= _id%>'><a href='#' class='fa fa-trash-o'></a><%= message %></li>",

  "<li class = 'messageCreator arrow_box'><%= username %></li>",
  "<li class = 'messageContent' data-id = '<%= _id%>'><%= message %></li>",
  "<li class = 'trash'><a href='#' class='fa fa-trash-o'></a></li>",
  "</ul>"
].join("");

templates.username = [
  "<span>You are <span class='username'><%= username %></span></span>"
].join("");

templates.usernameId = [
  "<div class='changeUserName'>Change Space Name</div>",
  "<span>You are <span class='username' data-id = '<%= _id%>'><%= username %></span></span>"
].join("");
