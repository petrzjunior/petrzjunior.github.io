function nahodnyObrazek() {
  $(".reseni").removeClass("click");
  $("#obrazek").attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Creeping_butercup_close_800.jpg/258px-Creeping_butercup_close_800.jpg");
  $(".reseni-text").html("Kytka");
}
$('.reseni').click(function () {
    $(".reseni").toggleClass("click");
});