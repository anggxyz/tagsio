import { type NextPage } from "next";
import Head from "next/head";
import { Tilt } from "react-tilt";
import Card from "../components/Card";
import Button from "../components/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tagsio</title>
        <meta name="description" content="tagsio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="tracking-tight text-white sm:text-[2rem]">
            Tags Edition v0
          </h1>
          <div className="grid grid-cols-1 gap-4">
          <Tilt
            style={{ background: '#000', borderRadius: '8px' }}
            options={{ scale: 1.01, max: 10, glare: true, 'max-glare': 1, speed: 1000 }}
          >
            {/* Card content */}
                <Card>
                  <div>
                <div
                  className="h-96 min-w-full bg-slate-500 rounded-md"
                >
                  Image
                </div>
                <div className="text-lg">
                  1 ETH
                </div>
                </div>
                </Card>
            </Tilt>
            {/* bottom row  */}
            <div className="flex flex-col gap-3">
                <Button
                  title="Buy"
                  onClick={() => {
                    console.log("clicked")
                  }}
                  className="bg-green-500"
                />
                <div className="flex flex-row min-w-full gap-3">
                <Button
                  title="Sell"
                  onClick={() => {
                    console.log("clicked")
                  }}
                  className="w-1/2 bg-slate-500"
                />
                <Button
                  title="Redeem"
                  onClick={() => {
                    console.log("clicked")
                  }}
                  className="w-1/2 bg-slate-500"
                />

                </div>
                </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
