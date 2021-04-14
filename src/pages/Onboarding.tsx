import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Parallax, Scrollbar, A11y } from 'swiper';
import styled from "styled-components";
import SignIn from "../pages/SignIn";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import BG from "../pics/onboarding_bg.png";
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Parallax, Pagination, Scrollbar, A11y]);

const SwipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SwipeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 44px;
  font-weight: 900;
  color: #000;
  margin: 0px;
`;

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #205400;
  margin: 0px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3D3D3D;
  line-height: 27px;
  margin: 0px;
`;

const Button = styled.button`
  height: 56px;
  background: #50811B;
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18), 0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12), 0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  border-radius: 4.5px;

  border: none;
  color: white;
  font-size: 18px;
  padding: 10px 60px;
  margin: 10px 0px;
  cursor: pointer;
`;

const SwiperFooterButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ParallaxBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 500%;
  height: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
  background-image:url(${BG});
`;

const Onboarding: FC = () => {
  const [isOnboardingDisabled, setIsOnboardingDisabled] = useState<boolean>(false);

  const disableOnboarding = () => {
    localStorage.setItem('HaffaApp:showOnboardingScreen', 'false');
    setIsOnboardingDisabled(true);
  }

  if (isOnboardingDisabled) {
    return <Redirect to="app" />
  }

  const slides = [
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <SubTitle>En delningsplattform.</SubTitle>
          </div>
          <div data-swiper-parallax="-200">
            <Title>Haffa!</Title>
          </div>
          <div data-swiper-parallax="-300">
            <Text>För anställda i Helsingborgs stad som vill återbruka och dela mera.</Text>
            <Text>Vår planet klarar inte mer konsumtion av nya prylar. Därför behöver vi dela mer med varandra och tänka oss för innan vi köper nytt. Finns det redan en begagnad stol i organisationen? Återbruka den istället för att köpa en ny.</Text>
            <Text>Med Haffa gör vi det enkelt att agera klimatsmart på jobbet.</Text>
            <SwiperFooterButtons>
              <Button className="swipe-next">Nu kör vi</Button>
              <Button onClick={disableOnboarding}>Logga in</Button>
            </SwiperFooterButtons>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <Button onClick={disableOnboarding}>Hoppa över</Button>
          </div>
          <div data-swiper-parallax="-200">
            <SubTitle>Haffa! En delningsplattform.</SubTitle>
          </div>
          <div data-swiper-parallax="-300">
            <Title>Återbruka möbler</Title>
            <Button className="swipe-next">Fortsätt</Button>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <Button onClick={disableOnboarding}>Hoppa över</Button>
          <SubTitle>Haffa! En delningsplattform.</SubTitle>
          <Title>Låna istället för att köpa nytt</Title>
          <Button className="swipe-next">Fortsätt</Button>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <Button onClick={disableOnboarding}>Hoppa över</Button>
          <SubTitle>Haffa! En delningsplattform.</SubTitle>
          <Title>Dela din pryl med en kollega</Title>
          <Button className="swipe-next">Fortsätt</Button>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <Button onClick={disableOnboarding}>Hoppa över</Button>
          <SubTitle>Haffa! En delningsplattform.</SubTitle>
          <Title>Ju mer vi delar desto bättre</Title>
          <Button className="swipe-next">Fortsätt</Button>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <AmplifyAuthenticator>
            <SignIn />
          </AmplifyAuthenticator>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
  ];

  return (
    <Swiper
      parallax={true}
      speed={800}
      navigation={{
        nextEl: ".swipe-next",
      }}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      style={{ height: '100vh' }}
    >
      <ParallaxBackground data-swiper-parallax="-80%" />
      {slides}
    </Swiper>
  );
};

export default Onboarding;
