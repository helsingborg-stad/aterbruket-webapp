import { AuthState } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import React, { FC, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import SwiperCore, { A11y, Navigation, Pagination, Parallax, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import UserContext from "../contexts/UserContext";
import SignIn from "../pages/SignIn";
import BG from "../pics/onboarding_bg.png";
import HbgLogo from "../pics/HBG_logo_sm.png";

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
  font-size: 36px;
  font-weight: 900;
  color: #000;
  margin: 0px 0px 16px 0px;
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
  margin: 0px 0px 16px 0px;
`;

type ButtonProps = {
  transparent?: boolean;
  secondary?: boolean;
  shadow?: boolean;
  size?: 'sm' | 'md'
};

const Button = styled.button<ButtonProps>`
  background: #50811B;
  border-radius: 4.5px;
  border: none;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
  cursor: pointer;
  font-weight: 500;
  ${({ size }) =>
    size === 'sm' &&
    `
      font-size: 10px;
  `}
  ${({ secondary }) =>
    secondary &&
    `
      color: #205400;
      background: #E1E9DB;
      font-weight: 700;
      padding: 8px 12px;
  `}
 ${({ transparent }) =>
    transparent &&
    `
      color: #565656;
      background: transparent;
      box-shadow: none;
  `}
  ${({ shadow }) =>
    shadow &&
    `
      box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18), 0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12), 0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  `}
`;

const SwiperFooterButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SwiperHeaderButtons = styled.div`
  display: flex;
  align-items: flex-end;
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

const Logo = styled.img`
  width: 34px;
  margin-bottom: 26px;
`;

const Separator = styled.div`
  width: 32px;
  height: 2px;
  margin: 16px 0;
  background-color: #E1E9DB;
  border-radius: 10px;
`;

const Onboarding: FC = () => {
  const [isOnboardingDisabled, setIsOnboardingDisabled] = useState<boolean>(false);
  const { authState } = useContext(UserContext);

  const disableOnboarding = () => {
    localStorage.setItem('HaffaApp:showOnboardingScreen', 'false');
    setIsOnboardingDisabled(true);
  }

  const slides = [
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <Logo src={HbgLogo} alt="Logo" />
            <SubTitle>En delningsplattform.</SubTitle>
            <Separator />
          </div>
          <div data-swiper-parallax="-200">
            <Title>Haffa!</Title>
          </div>
          <div data-swiper-parallax="-300">
            <Text>För anställda i Helsingborgs stad som vill återbruka och dela mera.</Text>
            <Text>Vår planet klarar inte mer konsumtion av nya prylar. Därför behöver vi dela mer med varandra och tänka oss för innan vi köper nytt. Finns det redan en begagnad stol i organisationen? Återbruka den istället för att köpa en ny.</Text>
            <Text>Med Haffa gör vi det enkelt att agera klimatsmart på jobbet.</Text>
          </div>
          <div data-swiper-parallax="-400">
            <SwiperFooterButtons>
              <Button shadow className="swipe-next">Nu kör vi!</Button>
              <Button transparent onClick={disableOnboarding}>Logga in</Button>
            </SwiperFooterButtons>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <SwiperHeaderButtons>
              <Button size="sm" secondary onClick={disableOnboarding}>HOPPA ÖVER</Button>
            </SwiperHeaderButtons>
            <Logo src={HbgLogo} alt="Logo" />
            <SubTitle>Haffa! En delningsplattform.</SubTitle>
            <Separator />
          </div>
          <div data-swiper-parallax="-200">
            <Title>Återbruka möbler</Title>
          </div>
          <div data-swiper-parallax="-300">
            <Text>Med återbruket kan du haffa begagnade möbler istället för att köpa nya. </Text>
            <Text>Möblerna finns antingen i Återbrukets lokaler på Larmvägen 33 eller runt om i förvaltningarna.</Text>
            <Text>Ser du något du vill ha? Haffa möbeln och ta kontakt via annonsen, och kom överens om när och hur möbeln hämtas.</Text>
          </div>
          <div data-swiper-parallax="-400">
            <SwiperFooterButtons>
              <Button transparent className="swipe-next">Fortsätt</Button>
            </SwiperFooterButtons>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <SwiperHeaderButtons>
              <Button size="sm" secondary onClick={disableOnboarding}>HOPPA ÖVER</Button>
            </SwiperHeaderButtons>
            <Logo src={HbgLogo} alt="Logo" />
            <SubTitle>Haffa! En delningsplattform.</SubTitle>
            <Separator />
          </div>
          <div data-swiper-parallax="-200">
            <Title>Låna istället för att köpa nytt</Title>
          </div>
          <div data-swiper-parallax="-300">
            <Text>Varför ska alla ha sin egen laminator, skruvdragare, videokamera eller sparkcykel? Ofta har vi köpt in prylar som inte används hela tiden. Lika ofta köper vi identiska prylar på olika håll i organisationen. Dumt, eller hur? Låt oss dela mer!</Text>
            <Text>Med Haffa kan du enkelt hitta prylen du behöver låna istället för att din skola, enhet eller avdelning skall behöva köpa in nytt.</Text>
          </div>
          <div data-swiper-parallax="-400">
            <SwiperFooterButtons>
              <Button transparent className="swipe-next">Fortsätt</Button>
            </SwiperFooterButtons>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <SwiperHeaderButtons>
              <Button size="sm" secondary onClick={disableOnboarding}>HOPPA ÖVER</Button>
            </SwiperHeaderButtons>
            <Logo src={HbgLogo} alt="Logo" />
            <SubTitle>Haffa! En delningsplattform.</SubTitle>
            <Separator />
          </div>
          <div data-swiper-parallax="-200">
            <Title>Dela din pryl med en kollega</Title>
          </div>
          <div data-swiper-parallax="-300">
            <Text>Har du eller din avdelning saker som skulle kunna användas av flera?</Text>
            <Text>Lägg in dem här så blir det superenkelt för dina kollegor att själva låna prylarna.</Text>
            <Text>Med Haffa genererar du enkelt en QR-kod som du klistrar på din pryl och den som lånar kan enkelt scanna koden med sin telefon för att låna eller lämna tillbaka. </Text>
          </div>
          <div data-swiper-parallax="-400">
            <SwiperFooterButtons>
              <Button transparent className="swipe-next">Fortsätt</Button>
            </SwiperFooterButtons>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <div data-swiper-parallax="-100">
            <SwiperHeaderButtons>
              <Button size="sm" secondary onClick={disableOnboarding}>HOPPA ÖVER</Button>
            </SwiperHeaderButtons>
            <Logo src={HbgLogo} alt="Logo" />
            <SubTitle>Haffa! En delningsplattform.</SubTitle>
            <Separator />
          </div>
          <div data-swiper-parallax="-200">
            <Title>Ju mer vi delar desto bättre</Title>
          </div>
          <div data-swiper-parallax="-300">
            <Text>En app räddar inte världen. Men ett förändrat beteende kan betyda mycket! Ju mer vi delar med varandra i organisationen, desto smartare hushåller vi med planetens resurser.</Text>
            <Text>Med haffa blir det enklare att vara en klimathjälte på jobbet.</Text>
            <Text>Häng med och bidra du också!</Text>
          </div>
          <div data-swiper-parallax="-400">
            <SwiperFooterButtons>
              <Button transparent className="swipe-next">Fortsätt</Button>
            </SwiperFooterButtons>
          </div>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
    <SwiperSlide>
      <SwipeContainer>
        <SwipeContent>
          <AmplifyAuthenticator>
            <SignIn>
              <div data-swiper-parallax="-100">
                <Logo src={HbgLogo} alt="Logo" />
                <SubTitle>En delningsplattform.</SubTitle>
                <Separator />
              </div>
              <div data-swiper-parallax="-200">
                <Title>Haffa!</Title>
              </div>
              <div data-swiper-parallax="-300">
                <Text>Logga in med ditt vanliga jobbkonto - ingen registrering behövs.</Text>
              </div>
            </SignIn>
          </AmplifyAuthenticator>
        </SwipeContent>
      </SwipeContainer>
    </SwiperSlide>,
  ];

  if (authState === AuthState.SignedIn || isOnboardingDisabled) {
    return <Redirect to={'app'} />
  }

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
