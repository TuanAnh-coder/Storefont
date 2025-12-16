import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Hero, Promotions, SaleProduct } from '@/components';
import { PrimaryLayout } from '@/layouts';
import Collection, { TopPick } from '@/components/home/TopPick';
import CreateYourOwn from '@/components/home/CreateYourOwn';
import { Trending } from '@/components/home/Trending';
import { AdsSpace } from '@/components/home/SpaceAds';
import Blog from '@/components/home/Blog';
import { api } from "@/utils/api";
export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Home: NextPageWithLayout = () => {
  const regionID = typeof window !== 'undefined' ? localStorage.getItem("selected_region") : null;
  console.log("Selected Region ID:", regionID);
  const { data, isLoading } = api.medusa.getProducts.useQuery({ regionID: regionID || undefined });
  // const { data: collection } = api.medusa.listCampaigns.useQuery();
  console.log("Collection Data:", data);
  return (
    <>
      <Hero />
      <Promotions />
      <SaleProduct product={data as any || []} />
      <TopPick product={data as any || []} />
      <Collection product={data as any || []} />
      <CreateYourOwn />
      <Trending />
      <AdsSpace />
      <Blog />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout seo={{ title: 'Home', canonical: '/' }}>
      {page}
    </PrimaryLayout>
  );
};

export default Home;
