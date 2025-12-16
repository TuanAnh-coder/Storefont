import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FiX } from 'react-icons/fi';
import { Collections } from '@/types';
import { NavLink } from '@/components';
import { Accordion } from '@/components/ui';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';

interface Props {
  navLinks: NavLink[];
  collections: Collections;
  onPageClose: () => void;
}

export const CollectionsPage = ({
  navLinks,
  collections,
  onPageClose,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 top-0 z-50 h-full w-full overflow-y-auto bg-white px-3 sm:px-4 pt-4 sm:pt-5">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-medium">{t('common:collections')}</h2>
        <FiX
          className="cursor-pointer hover:text-gray-600 transition-colors"
          size={24}
          data-testid="close"
          onClick={onPageClose}
        />
      </div>
      <ul className="flex flex-col px-0 sm:px-2">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className="border-b border-solid border-neutral-100 font-medium text-neutral-800"
          >
            {item.collapsible ? (
              <Accordion>
                <Accordion.Header>{t(`header:${item.name}`)}</Accordion.Header>
                <Accordion.Body className="px-2 text-sm">
                  <ul>
                    {collections &&
                      collections.map((collection: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; children: any[]; }) => (
                        <li
                          key={collection.id}
                          className="block border-b border-solid border-neutral-100"
                        >
                          <Accordion>
                            <Accordion.Header>
                              {collection.name}
                            </Accordion.Header>
                            <Accordion.Body className="px-2 text-xs">
                              <ul>
                                {collection.children
                                  .filter(subCollection =>
                                    subCollection.types.includes(
                                      item.name === 'men' ? 'MEN' : 'WOMEN'
                                    )
                                  )
                                  .map(subCollection => (
                                    <li
                                      key={subCollection.id}
                                      className="block border-b border-solid border-neutral-100 py-2"
                                    >
                                      <Link
                                        href={`/products/${item.name}/${subCollection.slug}`}
                                        onClick={onPageClose}
                                      >
                                        <h3>{subCollection.name}</h3>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion>
                        </li>
                      ))}
                  </ul>
                </Accordion.Body>
              </Accordion>
            ) : (
              <Link
                href={item.name}
                className="block py-4"
                onClick={onPageClose}
              >
                <h3>{t(`header:${item.name}`)}</h3>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
