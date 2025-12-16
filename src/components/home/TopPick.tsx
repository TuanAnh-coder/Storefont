import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ShoppingBag, Star } from 'lucide-react';
import Image from "next/image";
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Link from "next/link";

export const TopPick = ({ product }: { product: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Skip first item (it's displayed separately) and paginate the rest
  const remainingProducts = product?.slice(1) || [];
  const totalPages = Math.ceil(remainingProducts.length / itemsPerPage);
  const currentProducts = remainingProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className='mx-auto w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl py-4 sm:py-6 md:py-8'>
      <div className="flex items-center justify-center xl:justify-start mb-3 sm:mb-4 md:mb-5">
        <h1 className="sm:text-xl md:text-2xl font-bold text-gray-900">
          Top Picks For You
        </h1>
      </div>
      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-5 xl:grid-rows-2 xl:gap-5">
        {product?.[0] && (
          <Link href={`/product/${product?.[0].id}`} className="w-full xl:col-span-2 xl:row-span-2 h-full">
            <Card className="flex w-full xl:flex-col aspect-square h-full border-none shadow-lg">
              <Image src={product[0].thumbnail} alt={product[0].title} width={600} height={600} className="w-48 md:w-96 xl:w-full h-48 md:h-72 xl:h-full max-h-[400px] object-cover" />
              <CardContent className="flex flex-col aspect-square justify-center xl:p-6 xl:gap-2">
                <span className="">
                  {product[0].title}
                </span>
                <span className="font-bold">
                  ${product[0].variants[0]?.calculated_price.calculated_amount}
                </span>
                <span className="line-through text-gray-400">
                  ${product[0].variants[0]?.calculated_price.original_amount}
                </span>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Carousel cho các item còn lại */}
        <div className="w-full xl:col-span-3 xl:row-span-2 relative">
          <Carousel
            opts={{ align: "start" }}
            className="w-full"
          >
            <CarouselContent className="w-full xl:grid xl:grid-cols-3 xl:grid-rows-2 xl:grid-nowrap gap-4 px-4 items-stretch">
              {currentProducts.map((item: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-2/5 w-full xl:col-span-1 xl:row-span-1 h-full"
                >
                  <Link href={`/product/${item.id}`}>
                    <Card className="h-full flex flex-col border-none shadow-lg">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="w-full h-[150px] md:h-[250px] object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-lg"
                      />
                      <CardContent className="flex flex-col p-3 gap-2">
                        <span className="truncate">{item.title}</span>
                        <span className="font-bold">
                          ${item.variants[0]?.calculated_price.calculated_amount}
                        </span>
                        <span className="line-through text-gray-400">
                          ${item.variants[0]?.calculated_price.original_amount}
                        </span>
                      </CardContent>
                    </Card>

                  </Link>
                </CarouselItem>
              ))}
              {totalPages > 1 && (
                <>
                  <CarouselPrevious
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="left-6 lg:left-4"
                  />
                  <CarouselNext
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="right-0 lg:right-4"
                  />
                </>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default function Collection({ product }: { product: any }) {
  return (
    <div className='mx-auto w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl py-4 sm:py-6 md:py-8'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-2 md:gap-3">
        {/* Promotional Banner - Takes 2 rows on large screens */}
        <div className="col-span-2 md:col-span-1 lg:col-span-2 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-orange-600 mb-2 sm:mb-3 md:mb-4 bg-white/70 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 w-fit text-xs sm:text-sm">
              <Calendar size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
              <span className="font-semibold">End on Nov 28 2025</span>
            </div>

            <h2 className="text-md lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
              Explore Thanksgiving Day Collection
            </h2>

            <div className="mb-3 sm:mb-4">
              <p className="text-sm lg:text-base font-bold text-orange-600 mb-1 sm:mb-2">
                TALK TURKEY TO ME!
              </p>
              <p className="text-gray-700 text-xs lg:text-sm leading-relaxed">
                Our Thanksgiving products make wonderful gifts for all enthusiasts of Thanksgiving Day Parade.
              </p>
            </div>

            <button className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-xs sm:text-sm md:text-base">
              View more
              <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Decorative T-shirt icon */}
          <div className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0 opacity-10 sm:opacity-20">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-orange-400 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <path d="M20 35L30 25L40 30V80H60V30L70 25L80 35V45H85V30L75 20H65L50 10L35 20H25L15 30V45H20V35Z" fill="currentColor" />
            </svg>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-200 rounded-full opacity-20 -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-amber-300 rounded-full opacity-20 translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
        </div>

        {/* Product Grid */}
        {product.map((item: any) => (
          <Link
            href={`/product/${item.id}`}
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-orange-300"
          >
            <div className="aspect-square bg-gray-50 overflow-hidden relative">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-[150px] md:h-[250px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md">
                SALE
              </div>
              <button className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 bg-orange-600 text-white py-1 sm:py-1.5 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-0.5 sm:gap-1 hover:bg-orange-700 text-[10px] sm:text-xs">
                <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Add
              </button>
            </div>

            <div className="p-1.5 sm:p-2">
              <h3 className="text-[10px] sm:text-xs font-medium text-gray-900 mb-1 hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap text-[10px] sm:text-xs">
                <span className="font-black text-gray-900">
                  ${item.variants[0]?.calculated_price.calculated_amount}
                </span>
                <span className="text-gray-400 line-through text-[9px] sm:text-[10px]">
                  ${item.variants[0]?.calculated_price.original_amount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}