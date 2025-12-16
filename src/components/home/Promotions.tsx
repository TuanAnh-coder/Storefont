import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import Video from 'next-video';

export const Promotions = () => {
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const promoBanners = [
    { id: 1, video: '/video/mockup-1763312874740.mp4', thmnail: '/assets/thumbnail-1.webp' },
    { id: 2, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-2.webp' },
    { id: 3, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-3.webp' },
    { id: 4, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-4.webp' },
    { id: 5, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-5.webp' },
    { id: 6, video: '/video/mockup-1763312874740.mp4', thmnail: '/assets/thumbnail-1.webp' },
    { id: 7, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-2.webp' },
    { id: 8, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-3.webp' },
    { id: 9, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-4.webp' },
    { id: 10, video: '/video/mockup-1763313863119.mp4', thmnail: '/assets/thumbnail-5.webp' },
  ];


  const handleBannerClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setOpen(true);
  };

  return (
    <div className='max-w-7xl mx-auto px-2 xl:px-8 py-2 sm:py-3 md:py-5'>
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <Image
          src='/assets/logo.webp'
          alt='logo'
          width={96}
          height={96}
          className="w-12 sm:w-16 md:w-20 lg:w-24"
        />
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
          {promoBanners.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="basis-2/5 lg:basis-1/4 pl-1.5 sm:pl-2 md:pl-3 cursor-pointer"
              onClick={() => handleBannerClick(banner.video)}
            >
              <Card className="overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl border-2 border-gray-100 hover:border-blue-300">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[3/4]">
                    <Image
                      alt='thumbnail'
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                      src={banner.thmnail}
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-2.5 sm:p-3.5 shadow-lg">
                        <svg className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className='hidden lg:flex left-2'
        />
        <CarouselNext
          className='hidden lg:flex right-2'
        />
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm bg-transparent p-0 shadow-none border-none h-[75vh]">
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            {selectedVideo && (
              <video
                src={selectedVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
        </DialogContent>

      </Dialog>
    </div>
  );
};

export const SaleProduct = ({ product }: { product: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil((product?.length || 0) / itemsPerPage);
  const currentProducts = product?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  ) || [];

  return (
    <div className='w-full mx-auto 2xl:px-8 max-w-7xl'>
      <div className='bg-red-300 rounded-lg py-4 sm:py-6 md:py-8 px-2 xl:px-8'>
        <div className="flex items-center justify-between">
          <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
            🔥 Today's Big Deals
          </h1>
        </div>

        <div className="relative my-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProducts.map((item: any) => (
              <Link key={item.id} href={`/product/${item.id}`} onClick={() => {
                const existing = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
                if (!existing.includes(item.id)) {
                  existing.push(item.id);
                }
                localStorage.setItem("recentlyViewed", JSON.stringify(existing));
              }}>
                <Card>
                  <CardContent className='p-0'>
                    <Image
                      alt={item.title}
                      width={500}
                      height={500}
                      src={item.thumbnail}
                      className='object-cover w-full h-[200px] rounded-t-lg'
                    />
                    <div className="p-2 xl:px-4 xl:py-2">
                      <p className="text-xs uppercase sm:text-sm font-medium line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </p>
                      <div className='flex items-center gap-1 flex-wrap'>
                        <span className="text-sm sm:text-base font-bold text-gray-900 w-full md:w-12 md:text-md">${item.variants[0]?.calculated_price.calculated_amount}</span>
                        <span className='text-sm sm:text-base line-through text-gray-400'>${item.variants[0]?.calculated_price.original_amount}</span>
                        <span className='bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 font-bold shadow-sm'>
                          {((item.variants[0]?.calculated_price.calculated_amount / item.variants[0]?.calculated_price.original_amount) * 100).toFixed(0)}% OFF
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}