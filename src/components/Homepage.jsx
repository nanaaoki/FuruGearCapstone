import ClothesBundle from "../assets/clothesbundle.avif";
import clothesrack from "../assets/clothesrack.jpeg";
import sustainability from "../assets/sustainabilitycrop.jpeg"

export default function Homepage() {
  return (
    <>
      <main>
        <div className="hp-container">
        <img className="homepage-pic" src={sustainability} alt={"image of a woman holding a pile of clothes"} />

        <p className="mission-statement">
          Buy and Sell Locally
        </p></div>
      </main>
    </>
  );
}
