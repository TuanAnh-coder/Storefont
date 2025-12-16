"use client";
import { PrimaryLayout } from "@/layouts";
import { api } from "@/utils/api";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Thumnail from "@/components/product/Thumbnail";
import Detail from "@/components/product/Detail";
import Reviews from "@/components/product/Reviews";
import Description from "@/components/product/Description";
import CarouselProductList from "@/components/product/CarouselProductList";
import { useRouter } from "next/router";

const Products: NextPageWithLayout = () => {
  const router = useRouter()
  const slug = router.query.slug as string | undefined
  const { data } = api.medusa.getProduct.useQuery({ id: slug! }, { enabled: !!slug })

  return (
    <div>
      <div className="md:hidden">
        <Thumnail product={data} />
        <Detail product={data} />
        <Reviews star={4.8} date={'11/2/2025'} />
        <CarouselProductList />
        <Description description={data?.description || ''} />
      </div>
      <div className="hidden md:grid md:grid-cols-3 xl:max-w-7xl xl:mx-auto xl:gap-4 xl:p-6">
        <div className="flex flex-col gap-3 col-span-2">
          <Thumnail product={data} />
          <CarouselProductList />
          <Reviews star={4.8} date={'11/2/2025'} />
          <Description description={data?.description || ''} />
        </div>
        <Detail product={data} />
      </div>

    </div>
  );
};
Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout seo={{ title: 'Product', canonical: '/product' }}>
      {page}
    </PrimaryLayout>
  );
};

export default Products;