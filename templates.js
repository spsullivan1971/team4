var templates = {};

templates.newMessage = [
  "<ul class = 'messageContainer' data-id = '<%= _id%>'>",
  "<li class = 'messageCreator arrow_box'><%= username %></li>",
  "<li class = 'messageContent'><%- message %></li>",
  "<li class = 'trash'><a href='#' class='fa fa-times'></a></li>",
  "</ul>"
].join("");

templates.username = [
  "<span class='youAreText'>...you are &nbsp;<span class='username'><%= username %></span></span>"
].join("");

templates.usernameId = [
  "<div class='changeUserName'><a href='#' class='fa fa-sign-out'></a></div>",
  "<span class='youAreText'>...you are &nbsp;<span class='username' data-id = '<%= _id%>'><%= username %></span></span>"
].join("");

templates.otherUsers = [
  "<li><%= username %></li>"
].join("");
