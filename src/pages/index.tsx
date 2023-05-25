import { type NextPage } from "next";
import Card from "../components/Card";
import Main from "../layouts/Main";
import { BottomRow } from "../components/BottomRow";

const Home: NextPage = () => {
  return (
    <>
      <Main>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid w-80 grid-cols-1 gap-4">
            {/* Card content */}
            <Card description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis leo nec dictum semper. Etiam vel malesuada est, nec iaculis ante. Donec vel lobortis lacus.">
              <>
                <div className="h-96 min-w-full rounded-md bg-slate-500">
                  Image
                </div>
                <div className="text-lg">1 ETH</div>
              </>
            </Card>
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
