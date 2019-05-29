export default function putSearch() {
  // $(".search-input").keyup(search);
  $(".search-btn").click(search);

  function search() {
    $.each($(".cards_container .card"), function() {
      if (
        $(this)
          .html()
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
