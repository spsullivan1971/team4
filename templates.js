var templates = {};

templates.newMessage = [
  "<ul class = 'messageContainer' data-id = '<%= _id%>'>",
  "<li class = 'messageCreator arrow_box'><%= username %></li>",
  "<li class = 'messageContent'><%= message %></li>",
  "<li class = 'trash'><a href='#' class='fa fa-trash-o'></a></li>",
  "</ul>"
].join("");

templates.username = [
  "<span>You are <span class='username'><%= username %></span></span>"
].join("");

templates.usernameId = [
  "<div class='changeUserName'><a href='#'>Change Space Name</a></div>",
  "<span>You are <span class='username' data-id = '<%= _id%>'><%= username %></span></span>"
].join("");

templates.otherUsers = [
  "<li><%= username %></li>"
].join("");
