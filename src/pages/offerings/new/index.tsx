import Button from "@/components/Button";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Image from "next/image";
import Card from "@/components/Card";
import Scaffold from "@/components/Scaffold";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const fileTypes = ["JPEG", "PNG"];

const NewOfferingPage = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const [property, setProperty] = useState({
    title: "",
    description: "",
    address: "",
    tokenPriceInUsd: "",
  });

  const [contract, setContract] = useState({
    contractAddress: "",
    protocol: "POLYGON",
    tokenSymbol: "",
    totalSupply: "",
  });

  const displayPropertiesList = [
    {
      name: "Status",
      property: "Tokens available soon",
    },
    {
      name: "Address",
      property: property.address,
    },
    {
      name: "Number of available tokens",
      property: contract.totalSupply,
    },
    {
      name: `1 ${contract.tokenSymbol} =`,
      property: `US$ ${property.tokenPriceInUsd}`,
    },
  ];

  return (
    <Scaffold>
      <h1 className="text-xl">New offering</h1>
      <Card className="p-4 mt-4">
        <h2 className="font-bold">1. Token details</h2>
        <TextInput
          onChange={(val) => setContract({ ...contract, tokenSymbol: val })}
          className="mt-2"
          label="Token symbol (ticker)"
        />
        <TextInput className="mt-2" label="Token name" />
        <TextInput
          value={contract.totalSupply}
          onChange={(val) => setContract({ ...contract, totalSupply: val })}
          className="mt-2"
          label="Total supply"
        />
      </Card>
      <Card className="p-4 mt-4">
        <h2 className="font-bold">2. Asset details</h2>
        <TextInput
          onChange={(val) => setProperty({ ...property, title: val })}
          value={property.title}
          className="mt-2"
          label="Title"
        />
        <TextInput className="mt-2" label="Description" />
        <TextInput
          onChange={(val) => setProperty({ ...property, address: val })}
          value={property.address}
          className="mt-2"
          label="Address"
        />
        <TextInput
          onChange={(val) => setProperty({ ...property, tokenPriceInUsd: val })}
          value={property.tokenPriceInUsd}
          className="mt-2"
          label="Token unit price ($)"
        />
        <p className="mt-4 font-bold">Cover image</p>
        <p className="text-xs mb-4">
          Upload a .png or .jpg to be used as the cover image for this asset.
        </p>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </Card>
      <Card className="p-4 mt-4">
        <h2 className="font-bold">3. Gallery</h2>
        <p className="text-xs mb-4">
          Upload up to 12 .png or .jpg files to the gallery of this asset.
        </p>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </Card>
      <Card className="p-4 mt-4">
        <h2 className="font-bold">4. Legal documents</h2>

        <p className="font-bold mt-4">Token purchase agreement</p>
        <p className="text-xs mb-4">Upload .pdf documents only.</p>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />

        <p className="font-bold mt-4">Whitepaper</p>
        <p className="text-xs mb-4">Upload .pdf documents only.</p>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </Card>
      <Card className="p-4 mt-4">
        <h2 className="font-bold">4. Preview</h2>
        <div className="max-w-[1440px] mx-auto xl:flex flex-col items-center">
          <div className="flex flex-col xl:flex-row justify-center px-4 xl:px-0 bottom-[-18vh] w-full">
            <div className="text-white xl:flex xl:h-[840px] pt-[25px] xl:pt-[48px]">
              <div className="bg-[#001C25] text-center p-5 xl:p-10 xl:col-span-3 xl:w-[609px] rounded-tr-[16px] rounded-tl-[16px] xl:rounded-tr-[0px] xl:rounded-tl-[20px] xl:rounded-bl-[20px]">
                <div className="flex flex-col space-y-5">
                  <div>
                    <h1 className="text-[16px] xl:text-[20px]">
                      {contract.tokenSymbol || "TOKEN SYMBOL"}
                    </h1>
                    <h2 className="text-[16px] xl:text-[20px] font-light">
                      {property.title || "PROPERTY TITLE"}
                    </h2>
                  </div>
                  <hr className="block xl:hidden" />

                  <div className="xl:hidden">
                    <div className="space-y-[12px] py-8 ">
                      {displayPropertiesList.map((option, index) => (
                        <div
                          key={index}
                          className="assetsCard  xl:min-w-[528px] flex flex-col items-start rounded-[16px] px-[16px] py-[16px] text-start"
                        >
                          <div className="space-x-4 flex items-start">
                            <span className="text-primaryBlue font-bold text-[14px] tracking-[-0.25em]">
                              / /
                            </span>
                            <h6 className="text-midnightGreen font-light text-[14px]">
                              {option.name}
                            </h6>
                          </div>
                          <h4 className="text-[14px] mt-2">
                            {option.property}
                          </h4>
                        </div>
                      ))}
                    </div>

                    <div className="w-full justify-start space-x-5 pb-8">
                      {/* <Button
                    text="Buy now"
                    onClick={() => {
                      Router.push("/checkout");
                    }}
                  /> */}
                      <PrimaryButton
                        text="Whitepaper"
                        className="!bg-transparent border border-white"
                        onClick={() => {
                          // Router.push("/whitepaper");
                        }}
                      />
                      <PrimaryButton
                        text="Whitelist"
                        onClick={() => {
                          // Router.push("/whitelist");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-[12px] py-8 hidden xl:block">
                  {displayPropertiesList.map((option, index) => (
                    <div
                      key={index}
                      className="assetsCard h-[70px] xl:min-w-[528px] flex items-center rounded-[16px] px-[20px] py-[16px] justify-between"
                    >
                      <div className="space-x-4 flex items-center">
                        <span className="text-primaryBlue font-bold text-[18px] tracking-[-0.25em]">
                          / /
                        </span>
                        <h6 className="text-midnightGreen font-light">
                          {option.name}
                        </h6>
                      </div>
                      <h4>{option.property}</h4>
                    </div>
                  ))}
                </div>
                <p className="w-full text-[13px] text-midnightGreen text-start font-extralight">
                  (*) Considering the average real estate appreciation in Sao
                  Paulo is of 12,9% per year and an yearly passive income of 6%.
                  Souce: ABRAINC
                </p>
                <div className="w-full justify-start space-x-5 hidden xl:flex mt-8">
                  {/* <Button
                    text="Buy now"
                    onClick={() => {
                      Router.push("/checkout");
                    }}
                  /> */}
                  <PrimaryButton
                    text="Whitepaper"
                    className="!bg-transparent border border-white"
                    onClick={() => {
                      // Router.push("/whitepaper");
                    }}
                  />
                  <PrimaryButton
                    text="Whitelist"
                    onClick={() => {
                      // Router.push("/whitelist");
                    }}
                  />
                </div>
              </div>
              <div className="xl:w-[704px] relative bg-deepBlue rounded-br-[16px] rounded-bl-[16px] xl:rounded-bl-[0px] xl:rounded-tr-[20px] xl:rounded-br-[20px]">
                <div className="flex flex-col justify-center items-center absolute h-[80px] z-20 w-full">
                  <div className="mx-8 shadow rounded-full w-[156px] h-[40px] flex p-1 relative items-center bg-white text-sm space-x-1">
                    <button
                      // onClick={() => setMapView(false)}
                      className={`${
                        // !mapView
                        //   ? "bg-primaryBlue text-white" :
                        "bg-white text-midnightGreen"
                      }  w-full h-full rounded-full`}
                    >
                      Gallery
                    </button>

                    <button
                      // onClick={() => setMapView(true)}
                      className={`${
                        // mapView
                        // ? "bg-primaryBlue text-white" :
                        "bg-white text-midnightGreen"
                      }  w-full h-full rounded-full`}
                    >
                      Map
                    </button>
                  </div>
                </div>
                {/* {mapView ? (
                  <iframe
                    src="https://w  ww.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0160872309116!2d-46.6937154!3d-23.5678657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57a0963ac217%3A0x90e00f27847c65db!2sR.%20dos%20Pinheiros%2C%201673%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005422-012!5e0!3m2!1spt-BR!2sbr!4v1675104775912!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    allowFullScreen={false}
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-br-[16px] rounded-bl-[16px] xl:rounded-bl-[0px] xl:rounded-tr-[20px] xl:rounded-br-[20px] invert-[92%] contrast-[83%] h-[291px] lg:h-full"
                  />
                ) :  */}
                {/* ( */}
                <Swiper
                  // pagination={{
                  //   type: "fraction",
                  // }}
                  style={{
                    // @ts-ignore
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    "--swiper-navigation-size": "25px",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="h-[291px] xl:h-full rounded-br-[16px] rounded-bl-[16px] xl:rounded-bl-[0px] xl:rounded-tr-[20px] xl:rounded-br-[20px]"
                >
                  {/* <SwiperSlide key={"video"}>
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/6MLtCg7x63w?controls=1&amp&amp;showinfo=0&amp;modestbranding=1"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </SwiperSlide> */}
                  {/* {property?.gallery?.map((path, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={path}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          alt={`${property?.title} image carousel`}
                          priority
                        />
                      </SwiperSlide>
                    ))} */}
                </Swiper>
                {/* ) */}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Scaffold>
  );
};

export default NewOfferingPage;
