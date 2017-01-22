var json = [];
var vybrane = [];

function parseJSON() {
  $.getJSON('organismy.json', function(data) {
    vybrane = json = data;
    $("#kat-list").empty();
    json.forEach(function(kat) {
      $("#kat-list").append('<li class="list-group-item ' + (kat.zapnuto ? 'active' : '') + ' noselect" id="' + kat.nazev + '">' + kat.napis + '</li>');
    });
  });
}

function dalsi() {
  var kat = vybrane[Math.floor((Math.random() * (json.length - 1)) + 0)];
  var org = kat.organismy[Math.floor(Math.random() * kat.organismy.length)];
  var jmeno = org.nazev;
  var url = org.obrazky[Math.floor(Math.random() * org.obrazky.length)].url;
  $(".reseni").removeClass("click");
  $(".reseni-text").html(jmeno);
  $(".obrazek").attr("src", url);
}
$('.reseni').click(function() {
  $(".reseni").toggleClass("click");
});
$(document).on("click", ".list-group-item", function() {
  vybrane = [];
  $(this).toggleClass("active");
  var on = $(this).hasClass("active");
  for (var i = 0; i < json.length; i++) {
    if(json[i].nazev == $(this).attr("id")) {
      json[i].zapnuto = on;
    }
    if(json[i].zapnuto){
      vybrane.push(json[i]);
    }
  }
});
$(document).ready(function() {
  parseJSON();
});
