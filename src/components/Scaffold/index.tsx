import Image from "next/image";
import Header from "../Header";
import Sidenav from "../Sidenav";
import Head from "next/head";
import { Property } from "@/data/queries/get-properties";

interface Props {
  children: React.ReactNode;
  title: string;
  className?: string;
  hasPropertySelector?: boolean;
  selectedProperty?: Property;
  propertyList?: Property[];
}
const Scaffold = ({
  children,
  title,
  className,
  hasPropertySelector,
  selectedProperty,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`flex flex-row min-h-screen bg-[#000F14] truncate ${
          className || ""
        }`}
      >
        <Sidenav />
        <div className="w-full pl-32 pr-16 md:px-8 lg:px-16 xl:px-32 pb-16">
          <div className="mb-16 bg-transparent">
            {hasPropertySelector ? (
              <div className="flex items-center mt-20 text-5xl uppercase font-light">
                <img
                  width={80}
                  height={80}
                  src="/imgs/token_image.png"
                  alt=""
                  className="mr-8"
                />
                {selectedProperty?.contract.tokenSymbol}
              </div>
            ) : (
              <h1 className="text-5xl mt-20 font-light">{title}</h1>
            )}

            <Header />
          </div>
          <main className="w-full text-black ">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Scaffold;
