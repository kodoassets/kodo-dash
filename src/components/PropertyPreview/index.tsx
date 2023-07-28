import { Property } from "@/data/queries/get-properties";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const PropertyPreview = ({ property }: { property: Property }) => {
  const displayPropertiesList = [
    { name: "Status", property: property.status ?? "Tokens available soon" },
    {
      name: "Address",
      property: property.address ?? "",
    },
    {
      name: "Total area",
      property: `${property.totalAreaSquareMeters ?? ""} m² | BOMA area: 
                  ${property.bomaAreaSquareMeters ?? ""} m²`,
    },
    {
      name: "Total number of tokens",
      property: property?.contract?.totalSupply ?? "",
    },
    {
      name: `1 ${property?.contract?.tokenSymbol ?? ""} =`,
      property: `${property.squareMetersByToken ?? ""}dm² = US$
                  ${property.tokenPriceInUsd ?? ""}`,
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto xl:flex flex-col items-center ">
      <div className="flex flex-col xl:flex-row justify-center px-4 xl:px-0 w-full">
        <div className="text-white xl:flex xl:h-[840px] pt-[25px] xl:pt-[48px]">
          <div className="bg-deepBlue text-center p-5 xl:p-10 xl:col-span-3 xl:w-[609px] rounded-tr-[16px] rounded-tl-[16px] xl:rounded-tr-[0px] xl:rounded-tl-[20px] xl:rounded-bl-[20px]">
            <div className="flex flex-col space-y-5">
              <div>
                <h1 className="text-[16px] xl:text-[20px]">
                  {property?.contract?.tokenSymbol ?? "KODO1"}
                </h1>
                <h2 className="text-[16px] xl:text-[20px] font-light">
                  {property?.title ?? "Faria Lima Building"}
                </h2>
              </div>
              <hr className="block md:hidden" />

              <div className="md:hidden">
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
                      <h4 className="text-[14px] mt-2">{option.property}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-[12px] py-8 hidden md:block">
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
          </div>
          <div className="truncate xl:w-[704px] relative bg-deepBlue rounded-br-[16px] rounded-bl-[16px] xl:rounded-bl-[0px] xl:rounded-tr-[20px] xl:rounded-br-[20px]">
            <Swiper
              pagination={{
                type: "fraction",
              }}
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
              {property?.gallery?.map((path, index) => (
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
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
