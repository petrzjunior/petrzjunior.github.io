var seznamKytek;
function nahodnyObrazek() {
  var nahoda = Math.floor((Math.random() * 50) + 1); 
  var nazev = seznamKytek.data[nahoda][0];
  var adresa = seznamKytek.data[nahoda][1];
  $(".reseni").removeClass("click");
  $("#obrazek").attr("src", adresa);
  $(".reseni-text").html(nazev);
}
function parseCSV() {
  Papa.parse("kytky.csv", {
    download: true,
    encoding: "UTF-8",
    complete: function (results) {
      seznamKytek = results;
      console.log(seznamKytek);
    }
  });
}
$('.reseni').click(function () {
  $(".reseni").toggleClass("click");
});