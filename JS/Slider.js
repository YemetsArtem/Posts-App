// SLIDER
export default function putSlider() {
  $(".cards_container-hotlist").slick({
    arrows: true,
    prevArrow: `<div class="slick-prev"><span><</span></div>`,
    nextArrow: `<div class="slick-next"><span>></span></div>`,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 2,
    infinite: true,
    responsive: [
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  return putSlider;
}
