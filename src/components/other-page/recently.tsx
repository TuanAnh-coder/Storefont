"use client"
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const Recently = () => {
    const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
    const regionID = typeof window !== 'undefined' ? localStorage.getItem("selected_region") : null;

    // Lấy dữ liệu từ localStorage CHỈ trên client
    useEffect(() => {
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
            setRecentlyViewed(JSON.parse(stored));
        }
    }, []);

    // gọi tRPC khi đã có recentlyViewed
    const { data: products } = api.medusa.getProductRecent.useQuery(
        { ids: recentlyViewed, regionID: regionID || undefined },
        { enabled: recentlyViewed.length > 0 } // chỉ gọi khi mảng không rỗng
    );


    return (
        <div className='max-w-7xl mx-auto py-2 sm:py-3 md:py-5 px-2 md:px-4 lg:px-0'>
            <div className='rounded-lg sm:rounded-xl py-3 sm:py-4 md:py-6 shadow-sm'>
                <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
                    <h1 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                        👀 Recently Viewed
                    </h1>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
                        {products && products.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-1.5 sm:pl-2 md:pl-3"
                            >
                                <Link href={`/product/${item.id}`} onClick={() => {
                                    const existing = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
                                    if (!existing.includes(item.id)) {
                                        existing.push(item.id);
                                    }
                                    localStorage.setItem("recentlyViewed", JSON.stringify(existing));
                                }}>
                                    <Card className="overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-xl border border-gray-100 hover:border-blue-200">
                                        <CardContent className='p-0'>
                                            <div className="relative aspect-square">
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-[150px] md:h-[250px] object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-lg"
                                                />
                                            </div>
                                            <div className="p-2 sm:p-3 md:p-4">
                                                <p className="text-xs sm:text-sm font-medium truncate line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5 sm:mb-2">
                                                    {item.title}
                                                </p>
                                                <div className='flex items-center gap-1 sm:gap-1.5 flex-wrap'>
                                                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">${item.variants?.[0]?.calculated_price?.calculated_amount}</span>
                                                    <span className='text-xs sm:text-sm line-through text-gray-400'>${item.variants?.[0]?.calculated_price?.original_amount}</span>
                                                    <span className='bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 font-bold shadow-sm'>
                                                        {((item.variants?.[0]?.calculated_price?.calculated_amount / item.variants?.[0]?.calculated_price?.original_amount) * 100).toFixed(0)}% OFF
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='hidden lg:flex left-2' />
                    <CarouselNext className='hidden lg:flex right-2' />
                </Carousel>
            </div>
        </div>
    )
}
export default Recently