// const displayPropertiesList = [
//   {
//     name: "Status",
//     property: "Tokens available soon",
//   },
//   {
//     name: "Address",
//     property: property.address,
//   },
//   {
//     name: "Number of available tokens",
//     property: contract.totalSupply,
//   },
//   {
//     name: `1 ${contract.tokenSymbol} =`,
//     property: `US$ ${property.tokenPriceInUsd}`,
//   },
// ];

// {/* <Card className="p-4 mt-4">
//   <h2 className="font-bold">4. Preview</h2>
//   <div className="max-w-[1440px] mx-auto xl:flex flex-col items-center">
//     <div className="flex flex-col xl:flex-row justify-center px-4 xl:px-0 bottom-[-18vh] w-full">
//       <div className="text-white xl:flex xl:h-[840px] pt-[25px] xl:pt-[48px]">
//         <div className="bg-[#001C25] text-center p-5 xl:p-10 xl:col-span-3 xl:w-[609px] rounded-tr-[16px] rounded-tl-[16px] xl:rounded-tr-[0px] xl:rounded-tl-[20px] xl:rounded-bl-[20px]">
//           <div className="flex flex-col space-y-5">
//             <div>
//               <h1 className="text-[16px] xl:text-[20px]">
//                 {contract.tokenSymbol || "TOKEN SYMBOL"}
//               </h1>
//               <h2 className="text-[16px] xl:text-[20px] font-light">
//                 {property.title || "PROPERTY TITLE"}
//               </h2>
//             </div>
//             <hr className="block xl:hidden" />

//             <div className="xl:hidden">
//               <div className="space-y-[12px] py-8 ">
//                 {displayPropertiesList.map((option, index) => (
//                   <div
//                     key={index}
//                     className="bg-gradient xl:min-w-[528px] flex flex-col items-start rounded-[16px] px-[16px] py-[16px] text-start"
//                   >
//                     <div className="space-x-4 flex items-start">
//                       <span className="text-primaryBlue font-bold text-[14px] tracking-[-0.25em]">
//                         / /
//                       </span>
//                       <h6 className="text-midnightGreen font-light text-[14px]">
//                         {option.name}
//                       </h6>
//                     </div>
//                     <h4 className="text-[14px] mt-2">{option.property}</h4>
//                   </div>
//                 ))}
//               </div>

//               <div className="w-full justify-start space-x-5 pb-8">
//                 {/* <Button
//                     text="Buy now"
//                     onClick={() => {
//                       Router.push("/checkout");
//                     }}
//                   /> */}
//                 <PrimaryButton
//                   text="Whitepaper"
//                   className="!bg-transparent border border-white"
//                   onClick={() => {
//                     // Router.push("/whitepaper");
//                   }}
//                 />
//                 <PrimaryButton
//                   text="Whitelist"
//                   onClick={() => {
//                     // Router.push("/whitelist");
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="space-y-[12px] py-8 hidden xl:block">
//             {displayPropertiesList.map((option, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient h-[70px] xl:min-w-[528px] flex items-center rounded-[16px] px-[20px] py-[16px] justify-between"
//               >
//                 <div className="space-x-4 flex items-center">
//                   <span className="text-primaryBlue font-bold text-[18px] tracking-[-0.25em]">
//                     / /
//                   </span>
//                   <h6 className="text-midnightGreen font-light">
//                     {option.name}
//                   </h6>
//                 </div>
//                 <h4>{option.property}</h4>
//               </div>
//             ))}
//           </div>
//           <p className="w-full text-[13px] text-midnightGreen text-start font-extralight">
//             (*) Considering the average real estate appreciation in Sao Paulo is
//             of 12,9% per year and an yearly passive income of 6%. Souce: ABRAINC
//           </p>
//           <div className="w-full justify-start space-x-5 hidden xl:flex mt-8">

//             <PrimaryButton
//               text="Whitepaper"
//               className="!bg-transparent border border-white"
//               onClick={() => {
//               }}
//             />
//             <PrimaryButton
//               text="Whitelist"
//               onClick={() => {
//               }}
//             />
//           </div>
//         </div>
//         <div className="xl:w-[704px] relative bg-deepBlue rounded-br-[16px] rounded-bl-[16px] xl:rounded-bl-[0px] xl:rounded-tr-[20px] xl:rounded-br-[20px]">
//           <div className="flex flex-col justify-center items-center absolute h-[80px] z-20 w-full">
//             <div className="mx-8 shadow rounded-full w-[156px] h-[40px] flex p-1 relative items-center bg-white text-sm space-x-1">
//               <button
//                 className={`${
//                   // !mapView
//                   //   ? "bg-primaryBlue text-white" :
//                   "bg-white text-midnightGreen"
//                 }  w-full h-full rounded-full`}
//               >
//                 Gallery
//               </button>

//               <button
//                 // onClick={() => setMapView(true)}
//                 className={`${
//                   // mapView
//                   // ? "bg-primaryBlue text-white" :
//                   "bg-white text-midnightGreen"
//                 }  w-full h-full rounded-full`}
//               >
//                 Map
//               </button>
//             </div>
//           </div>
//           <Swiper
//             style={{
//               // @ts-ignore
//               "--swiper-navigation-color": "#fff",
//               "--swiper-pagination-color": "#fff",
//               "--swiper-navigation-size": "25px",
//             }}
//             navigation={true}
//             modules={[Pagination, Navigation]}
//             className="h-[291px] xl:h-full rounded-br-[16px] rounded-bl-[16px] xl:rounded-bl-[0px] xl:rounded-tr-[20px] xl:rounded-br-[20px]"
//           ></Swiper>
//         </div>
//       </div>
//     </div>
//   </div>
// </Card>
