import { useState, useRef, useEffect } from 'react';
import { FiPaperclip, FiSearch, FiX, FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { searchClient } from '@/lib/config';
import { api } from '@/utils/api';
import { SearchIcon } from 'lucide-react';

interface Props {
  onSearch: (value: string) => void;
}

type Hit = {
  id: string;
  title: string;
  description: string;
  handle: string;
  thumbnail: string;
  categories?: {
    id: string;
    name: string;
    handle: string;
  }[];
  tags?: {
    id: string;
    value: string;
  }[];
};

type Product = {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  thumbnail: string;
  handle: string;
};

const TRENDING_SEARCHES = [
  'labubu',
  'postal',
  'bts',
  'native american',
  'adult ugly christmas s...',
];


export const Search = ({ onSearch }: Props) => {
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const router = useRouter();
  const { data: categories } = api.medusa.listCategories.useQuery();
  const { data: products } = api.medusa.getProducts.useQuery();
  
  useEffect(() => {
    setShowDropdown(false);
    setShowSearchResults(false);
  }, [pathname]);

  useEffect(() => {
    // Show search results when typing
    if (value.trim().length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      onSearch(value);
      setShowDropdown(false);
    }
  };

  const handleClearInput = () => {
    setValue('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleTrendingClick = (term: string) => {
    setValue(term);
    onSearch(term);
    setShowDropdown(false);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/category/${category.toLowerCase()}`);
    setShowDropdown(false);
  };

  const showClearButton = !!value;

  return (
    <>
      {/* Mobile & Desktop Container */}
      <div ref={dropdownRef} className="relative w-full flex justify-end xl:justify-center">
        {/* Desktop Search Form */}
        <form
          className="flex justify-between items-center relative w-full hidden xl:flex"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="absolute left-1 sm:left-2 h-full w-7 sm:w-8 cursor-pointer pl-1.5 sm:pl-2.5 text-neutral-500 hover:text-orange-500 flex items-center justify-center"
          >
            <FiSearch size={18} />
          </button>
          <input
            className="h-full w-full rounded-lg border-orange-500 bg-neutral-100 p-2 sm:p-2.5 pl-8 sm:pl-12 border-2 text-xs sm:text-sm"
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder={`${t('search')}`}
            aria-label="Search"
            value={value}
            ref={inputRef}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
          {showClearButton ? (
            <button
              type="button"
              className="absolute right-1 sm:right-2 h-full w-7 sm:w-8 cursor-pointer pr-1.5 sm:pr-2.5 text-neutral-500 flex items-center justify-center"
              aria-label="Clear search input"
              onClick={handleClearInput}
            >
              <FiX size={18} className='hover:text-orange-500' />
            </button>
          ) : (
            <button
              type="submit"
              className="absolute right-1 sm:right-2 h-full w-7 sm:w-8 cursor-pointer pr-1.5 sm:pr-2.5 text-neutral-500 flex items-center justify-center"
              aria-label="Submit search"
            >
              <FiPaperclip size={18} className='hover:text-orange-500' />
            </button>
          )}
        </form>

        {/* Mobile Search Icon */}
        <button
          type="button"
          onClick={() => setShowDropdown(true)}
          className="xl:hidden flex items-center justify-center text-neutral-500 hover:text-orange-500"
          aria-label="Open search"
        >
          <FiSearch size={18} />
        </button>

        {/* Desktop Dropdown Overlay */}
        {showDropdown && (
          <div className="hidden xl:block absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50" style={{ width: '900px', maxWidth: '95vw' }}>
            <div className="flex">
              {/* Left: Trending Searches */}
              <div className="w-64 border-r border-gray-100 p-6 bg-white">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Trending searches</h3>
                <div className="space-y-1">
                  {TRENDING_SEARCHES.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTrendingClick(term)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center gap-3"
                    >
                      <FiTrendingUp className="text-gray-400 flex-shrink-0" size={16} />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Special Picks or Search Results */}
              <div className="flex-1 p-6">
                {showSearchResults && value ? (
                  // Show MeiliSearch Results
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Search Results for &quot;{value}&quot;</h3>
                    <InstantSearch
                      searchClient={searchClient}
                      indexName={process.env.NEXT_PUBLIC_MEILISEARCH_INDEX_NAME || 'products'}
                    >
                      <SearchBox
                        placeholder=""
                        className="hidden"
                        queryHook={(query, search) => search(value)}
                      />
                      <div className="max-h-96 overflow-y-auto">
                        <Hits hitComponent={HitComponent} />
                      </div>
                    </InstantSearch>
                  </>
                ) : (
                  // Show Special Picks by default
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Today&apos;s Special Picks</h3>

                    {/* Products Grid */}
                    <div className="grid grid-cols-5 gap-3 mb-6">
                      {products?.slice(0, 10).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.handle}`}
                          onClick={() => setShowDropdown(false)}
                          className="group block"
                        >
                          <div className="bg-gray-100 rounded-lg overflow-hidden mb-2 relative" style={{ aspectRatio: '1/1' }}>
                            <Image
                              src={product.thumbnail || '/api/placeholder/200/200'}
                              alt={product.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 200px"
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <h4 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2 truncate" style={{ minHeight: '2.5rem' }}>
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-red-600">
                              ${product?.variants?.[0]?.calculated_price?.calculated_amount ? (product.variants[0].calculated_price.calculated_amount / 100).toFixed(2) : '0.00'}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      {categories?.map((category, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCategoryClick(category.name)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Full Screen Overlay */}
      {showDropdown && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowDropdown(false)}>
          <div className="bg-white h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Search Input Header */}
            <div className="sticky top-0 bg-white border-b p-4 z-10">
              <form onSubmit={handleSubmit} className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={t('search')}
                  className="w-full pl-10 pr-10 py-3 border-2 border-orange-500 rounded-lg focus:outline-none text-base"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowDropdown(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                >
                  <FiX size={20} />
                </button>
              </form>
            </div>
            {/* Mobile Content */}
            <div className="p-4">
              {showSearchResults && value ? (
                // Show MeiliSearch Results on Mobile
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Search Results for &quot;{value}&quot;</h3>
                  <InstantSearch
                    searchClient={searchClient}
                    indexName={process.env.NEXT_PUBLIC_MEILISEARCH_INDEX_NAME || 'products'}
                  >
                    <SearchBox
                      placeholder=""
                      className="hidden"
                      queryHook={(query, search) => search(value)}
                    />
                    <div className="space-y-2">
                      <Hits hitComponent={HitComponent} />
                    </div>
                  </InstantSearch>
                </div>
              ) : (
                // Show Hot Search + Special Picks by default
                <>
                  {/* Hot Search / Trending Searches */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Trending searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((term, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTrendingClick(term)}
                          className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                        >
                          <FiTrendingUp className="text-gray-400" size={14} />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Picks Mobile Grid */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Today&apos;s Special Picks</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {products?.slice(0, 6).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.handle}`}
                          onClick={() => setShowDropdown(false)}
                          className="block"
                        >
                          <div className="bg-gray-100 rounded-lg overflow-hidden mb-2 relative" style={{ aspectRatio: '1/1' }}>
                            <Image
                              src={product.thumbnail || '/api/placeholder/200/200'}
                              alt={product.title}
                              fill
                              sizes="50vw"
                              className="object-cover"
                            />
                          </div>
                          <h4 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-red-600">
                              ${product?.variants?.[0]?.calculated_price?.calculated_amount ? (product.variants[0].calculated_price.calculated_amount / 100).toFixed(2) : '0.00'}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Category Chips Mobile */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories?.map((category, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCategoryClick(category.name)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const HitComponent = ({ hit }: { hit: Hit }) => {
  return (
    <Link
      href={`/products/${hit.handle}`}
      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
    >
      <div className="relative mr-4 flex-shrink-0">
        {hit.thumbnail ? (
          <Image
            src={hit.thumbnail}
            alt={hit.title}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-100"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <FiSearch className="text-gray-400" size={24} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-900 truncate mb-1">
          {hit.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {hit.description || 'Không có mô tả'}
        </p>
      </div>
    </Link>
  );
};
