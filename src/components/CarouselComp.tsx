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
    top: 20px;
    right: 10px;
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
};

const CarouselComp: FC<Props> = ({ setShowCarousel }: Props) => {
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
            src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
            alt=""
          />
        </div>
        <div className="imgDiv">
          <img
            src="https://i.pinimg.com/originals/10/c3/98/10c3987a6e929335135bf4dae89ac212.jpg"
            alt=""
          />
        </div>
        <div className="imgDiv">
          <img
            src="https://www.officestock.com.au/assets/full/cdkpedestal.jpg?20181003095800"
            alt=""
          />
        </div>
      </Carousel>
    </CarouselWrapper>
  );
};
export default CarouselComp;
