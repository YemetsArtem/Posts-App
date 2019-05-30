// CREATE ONE CARD
export default function createCard(array, dbPlaylist, db) {
  // Create elements
  const card = $("#card-temp")
    .find(".card")
    .clone(true, true);
  const title = $(card).find(".card-title");
  const image = $(card).find(".card_image");
  const description = $(card).find(".card_description");
  const author = $(card).find(".author");
  const toPlaylist = $(card).find(".toPlaylist-button");
  const edit = $(card).find(".edit-button");

  // Add content to element
  card.id = array.id;
  title.html(array.title);
  image.attr("src", array.imgUrl);
  image.attr("alt", array.title);
  description.html(array.description);
  author.html(array.author);
  toPlaylist.html("Add to Playlist");
  edit.html("Edit card");

  //ADD FUNCTION TO EDIT BUTTON
  $(edit).on("click", function() {
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

        for (var keys in db) {
          for (var j = 0; j < db[keys].length; j++) {
            if (db[keys][j]["id"] == card.id) {
              if (modalTitle.val() !== "") {
                db[keys][j]["title"] = modalTitle.val();
                title.html(modalTitle.val());
              }
              if (modalDescription.val() !== "") {
                db[keys][j]["description"] = modalDescription.val();
                description.html(modalDescription.val());
              }
              if (modalAuthor.val() !== "") {
                db[keys][j]["author"] = modalAuthor.val();
                author.html(modalAuthor.val());
              }
              if (modalImage.val() !== "") {
                db[keys][j]["imgUrl"] = modalImage.val();
                image.attr("src", modalImage.val());
              }
            }
          }
        }
        $("#homePage").click();
        modal.modal("hide");
        // axios.put(`http://localhost:3000/cardsData`, db);
      });
  });

  //ADD FUNCTION TO PLAYLIST BUTTON
  $(toPlaylist).on("click", function() {
    // Create remove card
    let remove = $("<button>");
    remove.addClass("delete-button");
    remove.html("Delete");

    // Create clone for card and it child elements
    const cardClone = card.clone(true, true);
    cardClone.id = card.id;
    cardClone.removeClass();
    cardClone.addClass("card-clone");
    const authorContainerClone = $(cardClone).find(".card_author-container");

    // Delete playlist and edit button in card clone
    $(cardClone)
      .find(".toPlaylist-button")
      .remove();
    $(cardClone)
      .find(".edit-button")
      .remove();

    // Add event to our remove button
    $(remove).on("click", function() {
      // Delete in array
      dbPlaylist.splice(dbPlaylist.indexOf(cardClone), 1);

      // Change items-amount in playlist
      $(".items-amount").html(dbPlaylist.length);

      // Delete in UI
      cardClone.remove();

      // Reload Playlist page
      if (dbPlaylist.length === 0) {
        $("#myPlaylist").click();
      }
    });

    // Insert elements to card clone
    $(authorContainerClone).append(remove);
    dbPlaylist.push(cardClone);

    // Function that check if created clone is already in playlist - delete this clone
    (function() {
      var duplicateElements = [];
      next: for (var i = 0; i < dbPlaylist.length; i++) {
        let idNumber = dbPlaylist[i].id;
        for (var j = 0; j < duplicateElements.length; j++) {
          if (duplicateElements[j] == idNumber) {
            dbPlaylist.splice(i, 1);
            continue next;
          }
        }
        duplicateElements.push(+idNumber);
      }
    })();

    // Change nuber of elements in Playlist in our item amount
    $(".items-amount").html(dbPlaylist.length);
  });

  return card;
}
