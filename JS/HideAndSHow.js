// Hide and show playlist and main containers correspondingly
export default function HideAndSHow(
  target,
  contMain,
  contPlaylist,
  contHotlist
) {
  if (target === "homePage") {
    $(".header").hide("slow");
    $("main").show();
    $(".hotlist-title").show("slow");
    $(".main-title").show("slow");
    contPlaylist.hide("slow");
    contHotlist.show("slow");
    contMain.html(" ");
    contMain.show("slow");
  } else if (target === "myPlaylist") {
    if ($(contHotlist).is(":visible")) contHotlist.hide("slow");
    $(".header").hide("slow");
    $("main").show("slow");
    $(".hotlist-title").hide("slow");
    $(".main-title").hide("slow");
    contMain.hide("slow");
    contPlaylist.show("slow");
  } else {
    $("main").hide("slow");
    $(".header").show("slow");
  }
}
