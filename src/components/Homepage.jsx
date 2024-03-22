import sustainability from "../assets/sustainabilitycrop.jpeg";

import mountainBackpack from "../assets/mountainBackpack.jpeg";

export default function Homepage() {
  return (
    <div className="hp-all">
      <main>
        <div className="hp-container">
          <img
            className="homepage-pic"
            src={sustainability}
            alt={"image of a woman holding a pile of clothes"}
          />

          <p className="hp-statement">Buy and Sell Your Gear Locally.</p>
        </div>
        <div>
          <p className="hp-mission">
            FURUGEAR (or furugiya/古着屋 meaning "thrift store" in Japanese)
            strives to connect outdoor enthusiasts in the most populous city in
            the country, and help sell and buy secondhand gear that may be
            taking up valuable space in our NYC-sized homes. Reduce waste by
            giving your gear a second life.
          </p>

          <div className="hp-details">
            <div className="hp-hiw">
              <h4>How it Works:</h4>
              <ol>
                <li>Join our cause by creating an account.</li>
                <li>Upload the item(s) you wish to sell.</li>
                <li>
                  When your gear has been purchased, drop it off at the climbing
                  gym of the buyer's choice within one week of the purchase
                  date.
                </li>
              </ol>
            </div>
            <div className="hp-future">
              <img
                src={mountainBackpack}
                className="homepage-pic2"
                alt={
                  "image of a young woman's back with two short braids carrying a backpack while walking in the mountains"
                }
              />
              <h4>Future plans</h4>
              <p>
                While we are still in beta phase, we are hoping to add some
                features as we get our footing. Some features include:
              </p>
              <ul>
                <li>
                  The ability for the seller to indicate which gyms they are
                  able to drop off the gear at.
                </li>
                <li>
                  A messaging feature between seller and buyer for better
                  coordination.
                </li>
                <li>
                  The ability to sort based on condition (used, lightly used,
                  mint).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
