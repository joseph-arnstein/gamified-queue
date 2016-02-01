function Issue(name, location, language, description, snippet) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.waitTime = 0;
};

Issue.prototype.waiter = function(obj) {
  var interval = setInterval(function() {timer()}, 1000);
  var timer = function() {
    obj.waitTime+=1;
    console.log(obj.waitTime);
    if (obj.waitTime === 5) {
      stopTimer();
    }
  }
  var stopTimer = function() {
    clearInterval(interval);
  }

}
