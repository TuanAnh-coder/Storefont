import HeroComponent from "@/components/other-page/Hero";
import { PrimaryLayout } from "@/layouts";
import { GetStaticPathsResult, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";
import CreateYourOwn from "@/components/home/CreateYourOwn";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ReviewItem } from "@/components/product/Reviews";
import Recently from "@/components/other-page/recently";
import { List } from "lucide-react";
import ListStory from "@/components/other-page/ListStory";
import CollectStore from "@/components/other-page/CollectionStore";
export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string)),
    },
  };
};
const ThanksgivingPage: NextPageWithLayout = () => {
  const { data: product } = api.medusa.getProducts.useQuery()
  const { data: categories } = api.medusa.listCategories.useQuery()
  const heroProps = {
    product,
    categories
  }
  return (
    <div className="lg:max-w-7xl lg:mx-auto w-full lg:px-8">
      < HeroComponent {...heroProps} />
      <CreateYourOwn />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-2"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-2/3 md:basis-1/2 lg:basis-1/3 pl-4">
             <ReviewItem star={4} date={new Date()} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="px-2 lg:flex lg:gap-4 lg:items-stretch my-6">
        <ListStory />
        <CollectStore />
      </div>
      <Recently />
    </div>
  )
}
ThanksgivingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout seo={{ title: 'Thanks Giving Gifts', canonical: '/thanksgiving' }}>
      {page}
    </PrimaryLayout>
  );
};
export default ThanksgivingPage;