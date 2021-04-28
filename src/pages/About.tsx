import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
`;
const SubtitleContent = styled.p`
  font-weight: 700;
`;

const About = () => {
  const mailHref = `mailto:aterbruket.amf@helsingborg.se?subject=Mail to aterbruket`;
  const telHref = `tel:+4642102800`;

  return (
    <main>
      <Container>
        <h2>Vadå Haffa?</h2>
        <SubtitleContent>
          Du befinner dig i en webbtjänst som ska göra det enklare för oss
          anställda i Helsingborgs stad att dela prylar och återbruka möbler och
          material.
        </SubtitleContent>
        <article>
          <p>
            Tjänsten är tänkt att användas i din telefon för att enkelt finnas
            till hands när du är på något av stadens återbruk eller behöver låna
            en pryl.
          </p>
          <p>
            Under våren 2021 bygger vi färdigt den delen av tjänsten där du kan
            återbruka möbler. Senare kommer vi uppdatera tjänsten med nya
            funktioner för att dela prylar med varandra.
          </p>
          <p>
            Haffa drivs som en innovationspilot med stöd från SFF och AMF
            innovationsmedel.
          </p>
        </article>
        <h3>Återbruket</h3>
        <article>
          <p>
            I Helsingborg finns Återbruket för möbler på Filbornaskolan. På
            grund av corononapandemin tar vi endast emot bokade besök och max
            två personer per bokning.
          </p>
          <p>
            Du kan mejla <a href={mailHref}>aterbruket.amf@helsingborg.se </a>
            eller ringa om du hittar en möbel i annonserna som du vill
            reservera. Möbler kan reserveras i två veckor.
          </p>
          <p>
            Ring oss på <a href={telHref}>042-10 28 00</a> för att boka en tid
            om du vill hämta och lämna möbler eller besöka oss.
          </p>
        </article>
        <h3>Hämta och lämna möbler, hur går det till?</h3>
        <article>
          <p>
            Möblerna finns antingen i Återbrukets lokaler på Larmvägen 33 eller
            ute på förvaltningarna.
          </p>
          <p>
            Ta kontakt via annonsen, och kom överens om när och hur sakerna
            hämtas.
          </p>
          <p>
            Du måste själv hämta och lämna möblerna hos Återbruket. När du
            hämtar möbler, vill vi att anger ditt kommun-id, det vill säga samma
            som du använder vid inloggning. Vi tar emot och lämnar ut möbler på
            bokade tider.
          </p>
          <p>
            Kan du inte ta med dina fynd direkt, så går det bra att reservera
            dem i två veckor.s
          </p>
        </article>
        <h3>Hur Haffar jag nåt?</h3>
        <article>
          <p>
            I Haffa-tjänsten hittar du dels de möbler som finns hos Återbruket
            men också möbler som inte hittat dit ännu.
          </p>
          <p>
            Du hittar enkelt de tillgängliga möblerna i översikten. Sortera på
            den sorts möbel du letar efter och vilket skick etc.
          </p>
          <p>
            Scanna QR-koden med din mobil för att få veta en möbels egenskaper
            och haffa den när du är på plats.
          </p>
        </article>
        <h3>Övrigt</h3>
        <article>
          <p>
            I Helsingborg finns också två olika platser för återbrukat material
            till utomhusbruk.
          </p>
          <p>
            Det kan handla om stenar, jord, trämaterial eller annat som kommer
            från byggen eller renoveringar.
          </p>
        </article>
        <h2>
          DELA MED VARANDRA{" "}
          <span role="img" aria-label="peace">
            ✌🏻
          </span>
        </h2>
      </Container>
    </main>
  );
};

export default About;
