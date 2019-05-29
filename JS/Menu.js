export default function putMenu() {
  const menuLeft = $(".pushmenu-left");
  const menu = $("#navbar-pushmenu");

  menu.click(function() {
    $(this).toggleClass("active");
    $(".pushmenu-push").toggleClass("pushmenu-push-toright");
    menuLeft.toggleClass("pushmenu-open");
  });
}
