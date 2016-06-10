var seznamKytek;
var index = 0;
function nahodnyObrazek() {
  var nazev = seznamKytek[index][0];
  var adresa = seznamKytek[index][1];
  $(".reseni").removeClass("click");
  $("#obrazek").attr("src", adresa);
  $(".reseni-text").html(nazev);
  index++;
  $("#kytky-progress").css("width", index*2 + "%");
  if(index >= 50) {
    seznamKytek = shuffle(seznamKytek);
    index = 0;
  }
}
function parseCSV() {
  Papa.parse("kytky.csv", {
    download: true,
    encoding: "UTF-8",
    complete: function (results) {
      seznamKytek = results.data;
      seznamKytek = shuffle(seznamKytek);
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
$('.reseni').click(function () {
  $(".reseni").toggleClass("click");
});