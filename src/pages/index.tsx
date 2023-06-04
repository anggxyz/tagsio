import { type NextPage } from "next";
import Main from "../layouts/Main";
import { BottomRow } from "../components/BottomRow";
import { useOwnedNftsByAddress } from "../hooks/useOwnedNftsByAddress";
import Carousel, { CarouselItem } from "../components/Carousel";

const CardCarousel = () => {
  const { nfts } = useOwnedNftsByAddress();
  console.log({ nfts });
  return (
    <>
      <Carousel itemWidth={250}>
        <CarouselItem>
          <div>hello</div>
        </CarouselItem>
      </Carousel>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Main>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid w-80 grid-cols-1 gap-4">
            {/* Card content */}
            <CardCarousel />
            {/* bottom row  */}
            <div className="flex flex-row gap-1">
              <BottomRow />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Home;
