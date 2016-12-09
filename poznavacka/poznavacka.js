var json = [];

function parseJSON() {
    $.getJSON('organismy.json', function(data) {
        json = data;
    });
    json.forEach(function(kat) {
        $("#kat-list").append('<li class="list-group-item kat-item ' + (kat.zapnuto ? 'active' : '') + ' noselect">' + kat.napis + '</li>');
    });

}

function dalsi() {
    var kat = json[Math.floor((Math.random() * (json.length - 1)) + 0)];
    var org = kat.organismy[Math.floor(Math.random() * kat.organismy.length)];
    var jmeno = org.nazev;
    var url = org.obrazky[Math.floor(Math.random() * org.obrazky.length)].url;
    $(".reseni").removeClass("click");
    $(".reseni-text").html(jmeno);
    $("#obrazek").attr("src", url);
}
$('.reseni').click(function() {
    $(".reseni").toggleClass("click");
});
$(document).on("vclick", ".nahodna", function() {
    nahodnyObrazek();
});
$(document).on("vclick", ".pripravit", function() {
    parseCSV();
});
$(document).on("click", ".kat-item", function() {
    $(this).toggleClass("active");
    var on = $(this).hasClass("active");
    // Dodělat zapnutí
});
