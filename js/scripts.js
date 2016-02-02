function Issue(name, location, language, description, snippet, timestamp) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.timestamp = timestamp;
};

function Queue() {
  this.issues = [];
}

Queue.prototype.addIssue = function(issue) {
  this.issues.push(issue);
}

$(document).ready(function(){

  var newQueue = new Queue();

  $("form#issue-form").submit(function(event) {
    event.preventDefault();

    var name = $("input#pair-name").val();
    var language = $("select#language").val();
      var location = $("input#location").val();
      var description = $("textarea#description").val();
      var snippet = $("textarea#snippet").val();
    var timestamp = new Date();

    var newIssue = new Issue(name, location, language, description, snippet, timestamp);
    newQueue.addIssue(newIssue);
    var currentTime;
    var waitTime;

    // $('#queue-output').empty();
    // newQueue.issues.forEach(function(issue) {
    //   $('#queue-output').append('<tr><td>'+issue.name+'</td><td>'+issue.language+'</td><td class="waitTime'+newQueue.issues.indexOf(issue)+'">0 minutes</td></tr>');
    // });




    $('#queue-output').empty();
    newQueue.issues.forEach(function(issue) {
      // $('#queue-output').append('<tr><td>'+issue.name+'</td><td>'+issue.language+'</td><td class="waitTime'+newQueue.issues.indexOf(issue)+'">0 minutes</td></tr>');


      $('#queue-output').append(
        '<tr>'+
          '<td>'+
            '<div data-toggle="modal" data-target="#myModal'+newQueue.issues.indexOf(issue) + '">'
              +issue.name+
            '</div>'+
            '<div class="modal fade" id="myModal'+ newQueue.issues.indexOf(issue) +'" role="dialog">'+
              '<div class="modal-dialog modal-lg">'+
                '<div class="modal-content">'+
                  '<div class="modal-header">'+
                    '<button type="button" class="close" data-dismiss="modal">&times;'+
                    '</button>'+
                    '<h4 class="modal-title">Queue</h4>'+
                  '</div>'+
                  '<div class="modal-body">'+
                    '<p>'+issue.name+'</p>'+
                    '<p>'+issue.location+'</p>'+
                    '<p>'+issue.language+'</p>'+
                    '<p>'+issue.description+'</p>'+
                    '<p><xmp>'+issue.snippet+'</xmp></p>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</td>'+
          '<td>'+
            '<div data-toggle="modal" data-target="#myModal'+ newQueue.issues.indexOf(issue) + '">'
              +issue.language+
            '</div>'+
          '</td>'+
          '<td data-toggle="modal" data-target="#myModal'+newQueue.issues.indexOf(issue) + '" class="waitTime'+ newQueue.issues.indexOf(issue) +
              '">0 minutes'+
          '</td>'+
        '</tr>');
      });


    var interval = setInterval(function() { timer() }, 1000);
    function timer() {
      currentTime = new Date();

      newQueue.issues.forEach(function(issue) {

        waitTime = currentTime - issue.timestamp;
        var queueDiv = $('#queue-output');
        var td = queueDiv.find("td.waitTime"+newQueue.issues.indexOf(issue));
        td.each(function() {
          $(this).text(parseInt(waitTime/60000) + " minutes");
        });
      });
    }
  });

  // $('button.refresh').click(function() {
  //   var currentTime = new Date();
  //
  //   newQueue.issues.forEach(function(issue) {
  //     var issue = newQueue.issues.indexOf(issue)
  //     var waitTime = (currentTime - issue.timestamp)/60000;
  //     if(waitTime > 1) {
  //       var longWait = newQueue.issues.splice(issue, 1 );
  //       newQueue.issues.unshift(longWait);
  //       console.log(newQueue.issues);
  //     }}}}
  //   })
});
