import { PrimaryLayout } from "@/layouts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useMemo } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { api } from "@/utils/api";
import { useMultiplestepForm } from "@/hooks/useMultipleStep";
import BreadcrumbComponent from "@/components/sidebarCheckout";
import CartStep from "@/components/cart/cart";
import CheckoutForm from "@/components/cart/form";

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string)),
        },
    };
};

const Cart = () => {
    const {
    nextStep,
    currentStepIndex,
    goTo,
  } = useMultiplestepForm(4);
  let cartId: string = "";
  if (typeof window !== "undefined") {
    cartId = localStorage.getItem("cart_id")!;
  }
   const {data : cart} = api.medusa.getCart.useQuery({id: cartId})
   console.log(cart);
    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
            <BreadcrumbComponent currentStepIndex={currentStepIndex} />
            {currentStepIndex === 0 && <CartStep product={cart?.cart.items} nextStep={nextStep} />}
            {currentStepIndex === 1 && <CheckoutForm/>}
        </div>
    );
};

Cart.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <PrimaryLayout seo={{ title: 'Cart', canonical: '/cart' }}>
            {page}
        </PrimaryLayout>
    );
};

export default Cart;
