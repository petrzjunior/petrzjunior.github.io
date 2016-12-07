var kategorie = [];
var seznam = [];
var index = 0;

function nahodnyObrazek() {
    var nazev = seznamKytek[index][0];
    var adresa = seznamKytek[index][1];
    $(".reseni").removeClass("click");
    $("#obrazek").attr("src", adresa);
    $(".reseni-text").html(nazev);
    index++;
    $("#kytky-progress").css("width", index * (100 / 52) + "%");
    if (index >= 52) {
        seznamKytek = shuffle(seznamKytek);
        index = 0;
    }
}

function parseCSV() {
    Papa.parse("kategorie.csv", {
        download: true,
        encoding: "UTF-8",
        delimiter: ";",
        comments: "#",
        complete: function(results) {
            var seznamKat = results.data;
            $("#kat-list").empty();
            kategorie = [];
            seznamKat.forEach(function(kat) {
                $("#kat-list").append('<li class="list-group-item kat-item active noselect" data-kat=' + kat[0] + '><i class="fa fa-lg fa-check-square-o" aria-hidden="true"></i> ' + kat[1] + '</li>');
                kategorie.push(kat[0]);
            });
            $(".kat-item").click(function() {
                $(this).toggleClass("active");
                $("i", this).toggleClass("fa-square-o").toggleClass("fa-check-square-o");
                var kat = $(this).attr("data-kat");
                var on = $(this).hasClass("active");
                var index = kategorie.indexOf(kat);
                if(on && index == -1)
                {
                  kategorie.push(kat);
                }
                else if(!on && index != -1)
                {
                  kategorie.splice(index, 1);
                }
            });
        }
    });
    Papa.parse("kytky.csv", {
        download: true,
        encoding: "UTF-8",
        delimiter: ";",
        comments: "#",
        complete: function(results) {
            seznamKytek = results.data;
            seznamKytek = shuffle(seznamKytek);
            $("#pripravit-glyph").removeClass("glyphicon-circle-arrow-down");
            $("#pripravit-glyph").addClass("glyphicon-ok");
        }
    });
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
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
