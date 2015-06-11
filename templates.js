var templates = {};

templates.newMessage = [
  "<ul class = 'messageContainer'>",
  "<li class = 'messageContent' data-id = '<%= _id%>'><%= message %></li>",
  "<li class = 'messageCreator arrow_box'><%= username %></li>",
  "</ul>"
].join("");
