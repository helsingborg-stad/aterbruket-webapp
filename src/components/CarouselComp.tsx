import React, { FC } from "react";
import styled from "styled-components";
import Carousel from "styled-components-carousel";

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: white;
  display: flex;

  .closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
  }
  //genererat classnam
  .bOCFav {
    height: 100vh;
  }
  //genererat classnam
  .sc-pNWxx {
    display: flex;
  }
  .imgDiv {
    align-self: center;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    align-self: stretch;
  }
`;

type Props = {
  setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
};

const CarouselComp: FC<Props> = ({ setShowCarousel, image }: Props) => {
  console.log("image i carusel", image);
  return (
    <CarouselWrapper>
      <button
        className="closeBtn"
        type="button"
        onClick={() => setShowCarousel(false)}
      >
        X
      </button>

      <Carousel
        center
        infinite
        swipeable
        showArrows
        showIndicator
        slidesToShow={1}
      >
        <div className="imgDiv">
          <img
            src="https://www.fully.com/media/catalog/product/cache/0403c939416b062257652d84420a5735/b/a/bamboo_curve_new_visual.jpg"
            alt=""
          />
        </div>
        <div className="imgDiv">
          <img src={image} alt="" />
        </div>

        <div className="imgDiv">
          <img
            src="https://www.kinnarps.se/contentassets/3f8885420d58434da4bfb1289215d5c8/frisbee-feed_560x745.jpg?preset=product-card"
            alt=""
          />
        </div>
      </Carousel>
    </CarouselWrapper>
  );
};
export default CarouselComp;
