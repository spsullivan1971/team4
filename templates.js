var templates = {};

templates.newMessage = [
  "<ul>",
  "<li class = 'messageContent' data-id = '<%= _id%>'><%= message %></li>",
  "<li class = 'messageCreator'><%= username %></li>",
  "</ul>"
].join("");

templates.username = [
  "<span>You are <%= username %></span>"
].join("");
