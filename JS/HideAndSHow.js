// Hide and show playlist and main containers correspondingly
export default function HideAndSHow(target, clearMain, dbPlaylist) {
  if (target === "homePage") {
    $(".header").hide("slow");
    $("main").show();
    $(".cards_container-playlist").hide("slow");
    $(".cards_hotlist").show("slow");
    $(".cards-main").show("slow");
    clearMain.html(" ");
  } else if (target === "myPlaylist") {
    // Hide text in Playlist
    if (dbPlaylist.length > 0) {
      $(".playlist-content").hide();
    } else {
      $(".playlist-content").show();
    }
    $(".header").hide("slow");
    $("main").show("slow");
    $(".cards-main").hide("slow");
    $(".cards_hotlist").hide("slow");
    $(".cards_container-playlist").show("slow");
  } else {
    $("main").hide("slow");
    $(".header").show("slow");
  }
}
