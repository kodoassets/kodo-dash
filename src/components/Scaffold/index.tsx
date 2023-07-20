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
  selectedProperty?: string;
  propertyList?: Property[];
}
const Scaffold = ({
  children,
  title,
  className,
  hasPropertySelector,
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
                Kodo1
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 ml-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0001 12.5858L15.2929 7.29297L16.7071 8.70718L10.0001 15.4142L3.29297 8.70718L4.70718 7.29297L10.0001 12.5858Z"
                    fill="currentColor"
                  />
                </svg>
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
