import Image from 'next/image';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@/utils';
import { Collections } from '@/types';
import { CollectionType } from '@prisma/client';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';

interface Props {
  type: CollectionType;
  collections: Collections;
  onShowMenu: () => void;
  onCloseMenu: () => void;
}

const newItems = [
  { label: 'New Arrivals', href: '/' },
  { label: 'Best Sellers', href: '/' },
  { label: 'Only at Kara', href: '/' },
  { label: 'Members Exclusives', href: '/' },
  { label: 'Release Dates', href: '/' },
];

const trendingItems = [
  { label: 'Fall Collection', href: '/' },
  { label: 'Vintage 70s Collection', href: '/' },
  { label: 'Pharrell Premium Basics', href: '/' },
  { label: 'Tee Bundle:2 for $39 or 3 for $49', href: '/' },
  { label: 'Breast Cancer Awareness Collection', href: '/' },
];

export const MegaMenu = ({
  type,
  collections,
  onShowMenu,
  onCloseMenu,
}: Props) => {
  const typeInLowerCase = type.toString().toLowerCase();

  return (
    <div
      onMouseEnter={onShowMenu}
      onMouseLeave={onCloseMenu}
      className="absolute z-[500] w-full border-t border-solid border-neutral-200 bg-white shadow-md shadow-neutral-300"
    >
      <div className="mx-auto flex max-w-7xl">
        <div className="flex flex-1">
          <div className="ml-4 py-8">
            <Link
              href="/"
              onClick={onCloseMenu}
              className="text-sm font-bold uppercase leading-4 tracking-widest text-neutral-800 hover:underline"
            >
              New & Trending
            </Link>
            <ul className="pt-2">
              {newItems.map(({ label, href }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="mb-1.5 text-xs font-normal text-neutral-700 hover:underline"
                    onClick={onCloseMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mb-2 pt-3">
              {trendingItems.map(({ label, href }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="mb-1.5 text-xs font-normal text-neutral-700 hover:underline"
                    onClick={onCloseMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/" onClick={onCloseMenu}>
              <Image
                priority
                src="/assets/offer.webp"
                alt="offer"
                width={150}
                height={100}
                quality={100}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-[3] border-l border-solid shadow-neutral-300">
          {collections &&
            collections.map((collection: { id: Key | null | undefined; slug: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | (string & ReactElement<any, string | JSXElementConstructor<any>>) | (string & Iterable<ReactNode>) | (string & ReactPortal) | (string & PromiseLikeOfReactNode) | (number & ReactElement<any, string | JSXElementConstructor<any>>) | (number & Iterable<ReactNode>) | (number & ReactPortal) | (number & PromiseLikeOfReactNode) | (false & ReactElement<any, string | JSXElementConstructor<any>>) | (false & Iterable<ReactNode>) | (false & ReactPortal) | (false & PromiseLikeOfReactNode) | (true & ReactElement<any, string | JSXElementConstructor<any>>) | (true & Iterable<ReactNode>) | (true & ReactPortal) | (true & PromiseLikeOfReactNode) | (ReactElement<any, string | JSXElementConstructor<any>> & string) | (ReactElement<any, string | JSXElementConstructor<any>> & number) | (ReactElement<any, string | JSXElementConstructor<any>> & false) | (ReactElement<any, string | JSXElementConstructor<any>> & true) | (ReactElement<any, string | JSXElementConstructor<any>> & Iterable<ReactNode>) | (ReactElement<any, string | JSXElementConstructor<any>> & ReactPortal) | (ReactElement<any, string | JSXElementConstructor<any>> & PromiseLikeOfReactNode) | (Iterable<ReactNode> & string) | (Iterable<ReactNode> & number) | (Iterable<ReactNode> & false) | (Iterable<ReactNode> & true) | (Iterable<ReactNode> & ReactElement<any, string | JSXElementConstructor<any>>) | (Iterable<ReactNode> & ReactPortal) | (Iterable<ReactNode> & PromiseLikeOfReactNode) | (ReactPortal & string) | (ReactPortal & number) | (ReactPortal & false) | (ReactPortal & true) | (ReactPortal & ReactElement<any, string | JSXElementConstructor<any>>) | (ReactPortal & Iterable<ReactNode>) | (ReactPortal & PromiseLikeOfReactNode) | (PromiseLikeOfReactNode & string) | (PromiseLikeOfReactNode & number) | (PromiseLikeOfReactNode & false) | (PromiseLikeOfReactNode & true) | (PromiseLikeOfReactNode & ReactElement<any, string | JSXElementConstructor<any>>) | (PromiseLikeOfReactNode & Iterable<ReactNode>) | (PromiseLikeOfReactNode & ReactPortal) | (Iterable<ReactNode> & string) | (Iterable<ReactNode> & number) | (Iterable<ReactNode> & false) | (Iterable<ReactNode> & true) | (Iterable<ReactNode> & ReactElement<any, string | JSXElementConstructor<any>>) | (Iterable<ReactNode> & Iterable<ReactNode>) | (Iterable<ReactNode> & ReactPortal) | (Iterable<ReactNode> & PromiseLikeOfReactNode) | null | undefined; children: any[]; }) => (
              <div
                key={collection.id}
                className="ml-4 w-full max-w-[150px] py-8"
              >
                <Link
                  href={`/products/${typeInLowerCase}/${collection.slug}`}
                  onClick={onCloseMenu}
                  className="text-sm font-bold uppercase leading-4 tracking-widest text-neutral-800 hover:underline"
                >
                  {collection.name}
                </Link>
                <ul className="pt-2">
                  {collection.children
                    .filter(subCollection => subCollection.types.includes(type))
                    .map(subCollection => (
                      <li key={subCollection.id}>
                        <Link
                          href={`/products/${typeInLowerCase}/${subCollection.slug}`}
                          className="mb-1.5 text-xs font-normal text-neutral-700 hover:underline"
                          onClick={onCloseMenu}
                        >
                          {subCollection.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
      <div className="border-t border-solid shadow-neutral-300">
        <div className="mx-auto flex max-w-7xl">
          <div className="flex flex-1 items-center">
            <Link
              href="/"
              className="ml-4 w-full max-w-[150px] py-3 text-xs font-bold text-neutral-800 hover:underline"
              onClick={onCloseMenu}
            >
              Sale
            </Link>
          </div>
          <div className="flex flex-[3] items-center">
            {['shoes', 'clothing', 'accessories', 'sport', ''].map(
              (item, index) => (
                <Link
                  key={index}
                  href={`/products/${typeInLowerCase}/${item}`}
                  className="ml-4 w-full max-w-[150px] py-3 text-xs font-bold text-neutral-800 hover:underline"
                  onClick={onCloseMenu}
                >
                  {`All ${capitalizeFirstLetter(
                    typeInLowerCase
                  )}'s ${capitalizeFirstLetter(item)}`}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
