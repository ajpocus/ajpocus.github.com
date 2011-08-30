$(function () {
  // generate calendars
  var cals = $(".calendar");
  var year = (new Date).getFullYear();
  for (var i = 0; i < cals.length; i++) {
    $(cals[i]).datepicker({ defaultDate: new Date(year, i) });
    var day = $("a:contains('28')");
    var pos = day.position();
  }

  // get github data
  var urlbase = "https://api.github.com";
  var user = "ajpocus";
  var repos = [];
  var commitlist = [];

  // get list of user's repositories
  var repourl = urlbase + "/users/" + user + "/repos" + "?callback=getRepos";
  $.getJSON(repourl);
  function getRepos (repolist) {
    repolist.data.forEach(function (repo) {
      repos.push(repo.name);
    });
  };

  // for each repo, append commits to commitlist
  var commiturl;
  repos.forEach(function (repo) {
    commiturl = repourl + "/" + repo + "/commits?callback=getCommits";
    $.getJSON(commiturl);
    function getCommits (commit) {
      commitlist.push(commit.data.author.date);
    };
  });

});

/* cross-out stuff
    var crossout = $("<span>x</span>").hide().addClass(
      "cross-out").css(
      "top", pos.top-14).css(
      "left", pos.left+5).show();
    day.append(crossout);
*/
