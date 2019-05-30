export default function putSearch() {
  $(".search-input").keyup(search);

  function search() {
    $.each($(".cards_container-main .card"), function() {
      if (
        $(this)
          .text()
          .toLowerCase()
          .indexOf(
            $(".search-input")
              .val()
              .toLowerCase()
          ) === -1
      ) {
        $(this).hide();
        $(".cards_hotlist").hide();
      } else {
        $(this).show();
        $(".cards_hotlist").show();
      }
    });
  }
}
