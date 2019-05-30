import createCard from "./oneCard.js";
import HideAndSHow from "./HideAndSHow.js";
import putMenu from "./menu.js";
import putSearch from "./search.js";
import putSlider from "./sLider.js";
import createNewCard from "./createCard.js";

// MAIN CONTAINERS
const containerHotlist = $(".cards_container-hotlist");
const containerMain = $(".cards_container-main");
const containerPlayList = $(".cards_container-playlist");

$(document).ready(function() {
  // GET REQUEST
  axios
    .get("http://localhost:3000/cardsData")
    .then(request => {
      console.log(request);

      const db = request.data;
      // Create array for new-card elements
      db.newCards = [];
      // Create array for elements in Playlist container
      const dbPlaylist = [];

      // PUT PUSHMENU
      putMenu();

      // PUT SEARCH INPUT
      putSearch();

      // PUT ALL CARDS IN CONTAINERS
      function createAllCard(event) {
        // For HOMEPAGE container
        if (event.currentTarget.id === "homePage") {
          HideAndSHow(event.currentTarget.id, containerMain);
          for (var keys in db) {
            for (var j = 0; j < db[keys].length; j++) {
              $(containerMain).append(createCard(db[keys][j], dbPlaylist, db));
            }
          }
          // For HOTLIST container
          if (db.hotlist) {
            if (!$(".cards_container-hotlist").hasClass("slick-slider")) {
              for (var j = 0; j < db.hotlist.length; j++) {
                $(containerHotlist).append(
                  createCard(db.hotlist[j], dbPlaylist, db)
                );
              }
              putSlider();
            }
          }
        }
        // For PLAYLIST container
        else if (event.currentTarget.id === "myPlaylist") {
          HideAndSHow(event.currentTarget.id, containerMain, dbPlaylist);
          for (var i = 0; i < dbPlaylist.length; i++) {
            $(containerPlayList).append(dbPlaylist[i]);
          }
        }
        // For Create Card
        else if (event.currentTarget.id === "createCard") {
          createNewCard(db, event.currentTarget.id);
        }
        // For LOGO
        else HideAndSHow();
      }

      // BIND BUTTONS
      $("#homePage").on("click", event => {
        if ($("#myPlaylist").hasClass("disable")) {
          $("#myPlaylist").removeClass("disable");
          $("#myPlaylist").addClass("active");
          $("#myPlaylist").on("click", createAllCard);
          createAllCard(event);
          return;
        }
        createAllCard(event);
      });

      $("#logo").on("click", createAllCard);
      $("#createCard").on("click", createAllCard);
    })

    // CATCH ERRORS
    .catch(error => {
      console.error(error);
      alert(error);
    });
});
