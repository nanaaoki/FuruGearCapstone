import ClothesBundle from "../assets/clothesbundle.avif";

export default function Homepage() {
  return (
    <>
      <main>
        <h1 className="hp-header">Sustainability & Quality</h1>
        <img id="homepage-pic" src={ClothesBundle} alt={"image of a woman holding a pile of clothes"} />

        <p>
          Mission: Ex nulla occaecat dolor excepteur elit cupidatat consectetur
          laboris. Ullamco deserunt sint consequat pariatur consequat
          consectetur aliqua ut aliquip laborum non sit aliquip. Anim
          reprehenderit pariatur deserunt tempor ea aliqua consectetur
          exercitation eu. Nostrud amet est proident voluptate. Magna tempor
          aliquip sint ut nostrud ipsum qui tempor pariatur excepteur eu
          deserunt ut occaecat.
        </p>
      </main>
    </>
  );
}
