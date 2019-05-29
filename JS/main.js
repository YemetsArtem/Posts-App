import createCard from "./oneCard.js";
import HideAndSHow from "./HideAndSHow.js";
import putMenu from "./menu.js";
import putSearch from "./search.js";
import putSlider from "./sLider.js";

// MAIN CONTAINERS
const containerHotlist = $(".cards_container-hotlist");
const containerMain = $(".cards_container");
const containerPlayList = $(".cards_container-playlist");

$(document).ready(function() {
  // GET REQUEST
  axios
    .get("http://localhost:3000/cardsData")
    .then(request => {
      console.log(request);
      const db = request.data;
      db.newCards = [];
      const dbPlaylist = [];

      // PUT PUSHMENU
      putMenu();

      // PUT SEARCH INPUT
      putSearch();

      // PUT ALL CARDS IN CONTAINERS
      function createAllCard(event) {
        // For HOMEPAGE container
        if (event.currentTarget.id === "homePage") {
          HideAndSHow(
            event.currentTarget.id,
            containerMain,
            containerPlayList,
            containerHotlist
          );
          for (var keys in db) {
            for (var j = 0; j < db[keys].length; j++) {
              $(containerMain).append(createCard(db[keys][j], db, dbPlaylist));
            }
          }
          // For HOTLIST container
          if (db.hotlist) {
            if (!$(".cards_container-hotlist").hasClass("slick-slider")) {
              for (var j = 0; j < db.hotlist.length; j++) {
                $(containerHotlist).append(
                  createCard(db.hotlist[j], db, dbPlaylist)
                );
              }
              putSlider();
            }
          }
        }
        // For PLAYLIST container
        else if (event.currentTarget.id === "myPlaylist") {
          HideAndSHow(
            event.currentTarget.id,
            containerMain,
            containerPlayList,
            containerHotlist
          );
          for (var i = 0; i < dbPlaylist.length; i++) {
            $(containerPlayList).append(dbPlaylist[i]);
          }
        }
        // For Create Card
        else if (event.currentTarget.id === "createCard") {
          const modal = $("#modal-details").clone(true, true);
          $(modal).modal("show");

          modal
            .modal()
            .find("#save-btn")
            .on("click", () => {
              let modalTitle = $(modal).find("#m-card-title");
              let modalDescription = $(modal).find("#m-card-description");
              let modalAuthor = $(modal).find("#m-card-author");
              let modalImage = $(modal).find("#m-card-imgurl");

              const key = {
                ["id"]: Math.floor(Math.random() * (100 - 24 + 1) + 24),
                ["title"]: modalTitle.val(),
                ["description"]: modalDescription.val(),
                ["author"]: modalAuthor.val(),
                ["imgUrl"]: modalImage.val()
              };
              db.newCards.push(key);

              $("#homePage").click();
              modal.modal("hide");
              // axios.put(`http://localhost:3000/cardsData`, db);
            });
        }
        // For LOGO
        else HideAndSHow();
      }

      // BIND BUTTONS
      $("#logo").on("click", createAllCard);
      $("#homePage").on("click", createAllCard);
      $("#myPlaylist").on("click", createAllCard);
      $("#createCard").on("click", createAllCard);
    })

    // CATCH ERRORS
    .catch(error => {
      console.error(error);
    });
});
