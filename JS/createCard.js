export default function createNewCard(db, targetID) {
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

      if (targetID === "createCard") {
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
      }
    });
}
