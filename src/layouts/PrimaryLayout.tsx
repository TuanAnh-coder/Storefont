import React from 'react';
import { api } from '@/utils/api';
import { NextSeo, type NextSeoProps } from 'next-seo';
import { Header, Footer } from '@/components';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar';
import { CustomerProvider } from '@/hooks/useCustomer';


interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: NextSeoProps;
}

export const PrimaryLayout = ({ seo, children }: PrimaryLayoutProps) => {
  // TODO: Add collection router
  // const { data } = api.collection.all.useQuery();
  const data = undefined;

  return (
    <>
      <NextSeo noindex={true} nofollow={true} {...seo} />
      <Header />
      {children}
      <Footer />
    </>
  );
};
