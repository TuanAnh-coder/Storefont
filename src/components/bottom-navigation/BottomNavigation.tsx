import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { IconType } from 'react-icons';
import { FiHome, FiUser, FiHeart, FiShoppingBag, FiGrid, FiX, FiDownload, FiTrash2, FiPlus } from 'react-icons/fi';
import { Collections } from '@/types';
import { NavLink } from '@/components';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
interface Props {
  navLinks?: NavLink[];
  collections?: Collections;
}

interface BottomTab {
  title: string;
  Icon: IconType;
  id: string;
}

const FONTS = ['Roboto', 'Arial', 'Times New Roman', 'Georgia', 'Courier New', 'Verdana'];

const COLOR_PRESETS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00AA00' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Purple', value: '#800080' },
  { name: 'Gray', value: '#808080' },
];

interface TextConfig {
  value: string;
  font: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  color: string;
  textAlign: 'left' | 'center' | 'right';
}


export const BottomNavigation = ({ navLinks, collections }: Props) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('');
  const [productBaseColor, setProductBaseColor] = useState('#FFFFFF');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [designTitle, setDesignTitle] = useState('My Design');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<any>(null);
  
  const [textConfig, setTextConfig] = useState<TextConfig>({
    value: '',
    font: 'Roboto',
    fontSize: 35,
    isBold: false,
    isItalic: false,
    color: '#FFA500',
    textAlign: 'left',
  });

  const [colorMode, setColorMode] = useState<'product' | 'object'>('product');

  const bottomTabs: BottomTab[] = [
    { id: 'custom', title: t('common:Custom'), Icon: FiHome },
    { id: 'products', title: t('common:Products'), Icon: FiGrid },
    { id: 'designs', title: t('common:Designs'), Icon: FiShoppingBag },
    { id: 'text', title: t('common:Text'), Icon: FiHeart },
    { id: 'upload', title: t('common:Upload'), Icon: FiUser },
    { id: 'support', title: t('common:Support'), Icon: FiUser },
  ];


  return (
    <>
      <div className="fixed md:static max-h-[800px] lg:hidden bottom-0 left-0 right-0 z-50 h-14 sm:h-16 bg-white drop-shadow-[0_-15px_20px_rgba(0,0,0,0.10)] xl:h-screen xl:w-32 xl:flex xl:justify-center xl:flex-col">
        <Drawer>
          <div className='flex items-center h-full overflow-x-auto justify-around xl:flex-col xl:justify-start xl:gap-4'>
            {bottomTabs.map((tab) => (
              <DrawerTrigger key={tab.id} asChild>
                <Button 
                  onClick={() => setCurrentTab(tab.id)}
                  variant="ghost" 
                  className='flex-shrink-0 max-h-[50px] flex flex-col items-center justify-center text-[9px] sm:text-xs font-medium text-neutral-700 hover:text-orange-600 transition-colors gap-0.5 h-full px-2'
                >
                  <tab.Icon size={24} />
                  <span className="line-clamp-1">{tab.title}</span>
                </Button>
              </DrawerTrigger>
            ))}
          </div>

          <DrawerContent className="h-[90vh] flex flex-col">
            <DrawerHeader className="shrink-0">
              <DrawerTitle className="flex items-center justify-between">
                <span>{bottomTabs.find(t => t.id === currentTab)?.title}</span>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <FiX size={20} />
                  </Button>
                </DrawerClose>
              </DrawerTitle>
            </DrawerHeader>

            {currentTab === 'custom' && (
              <div className="flex-1 overflow-y-auto px-3 pb-20 space-y-3">
                <div className="bg-gray-100 rounded-lg p-2 flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="border-2 border-gray-300 rounded"
                  />
                </div>

                <input
                  type="text"
                  value={designTitle}
                  onChange={(e) => setDesignTitle(e.target.value)}
                  placeholder="Design title"
                  className="w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={() => setColorMode('product')}
                    size="sm"
                    className={`flex-1 text-xs ${colorMode === 'product' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
                  >
                    Màu Sản Phẩm
                  </Button>
                  <Button
                    onClick={() => setColorMode('object')}
                    size="sm"
                    className={`flex-1 text-xs ${colorMode === 'object' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
                  >
                    Màu Object
                  </Button>
                </div>

                {colorMode === 'product' && (
                  <div className="space-y-2 bg-blue-50 p-2 rounded">
                    <p className="text-xs font-medium">Chọn màu nền:</p>
                    <div className="grid grid-cols-5 gap-1">
                      {COLOR_PRESETS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setProductBaseColor(c.value)}
                          className={`h-8 rounded border-2 ${productBaseColor === c.value ? 'border-black' : 'border-gray-300'}`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {colorMode === 'object' && selectedId && (
                  <div className="space-y-2 bg-green-50 p-2 rounded">
                    <p className="text-xs font-medium">Chọn màu object:</p>
                    <div className="grid grid-cols-5 gap-1">
                      {COLOR_PRESETS.map((c) => (
                        <button
                          key={c.value}
                          className="h-8 rounded border border-gray-300 hover:border-black"
                          style={{ backgroundColor: c.value }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2 bg-purple-50 p-2 rounded">
                  <p className="text-xs font-medium">Thêm Text:</p>
                  <input
                    type="text"
                    value={textConfig.value}
                    onChange={(e) => setTextConfig({ ...textConfig, value: e.target.value })}
                    placeholder="Nhập text..."
                    className="w-full px-2 py-1 border rounded text-xs"
                    maxLength={50}
                  />
                  <div className="text-xs text-gray-600">{textConfig.value.length}/50</div>

                  <div className="grid grid-cols-2 gap-1">
                    <select
                      value={textConfig.font}
                      onChange={(e) => setTextConfig({ ...textConfig, font: e.target.value })}
                      className="px-2 py-1 border rounded text-xs"
                    >
                      {FONTS.map(f => <option key={f}>{f}</option>)}
                    </select>
                    <input
                      type="number"
                      value={textConfig.fontSize}
                      onChange={(e) => setTextConfig({ ...textConfig, fontSize: +e.target.value })}
                      min="12"
                      max="72"
                      className="px-2 py-1 border rounded text-xs"
                    />
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => setTextConfig({ ...textConfig, isBold: !textConfig.isBold })}
                      className={`flex-1 px-1 py-1 rounded text-xs ${textConfig.isBold ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      onClick={() => setTextConfig({ ...textConfig, isItalic: !textConfig.isItalic })}
                      className={`flex-1 px-1 py-1 rounded text-xs ${textConfig.isItalic ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
                    >
                      <em>I</em>
                    </button>
                    <input
                      type="color"
                      value={textConfig.color}
                      onChange={(e) => setTextConfig({ ...textConfig, color: e.target.value })}
                      className="w-10 h-7 rounded"
                    />
                  </div>

                  <Button size="sm" className="w-full text-xs bg-purple-600">
                    Thêm Text
                  </Button>
                </div>

                {/* <div {...getRootProps()} className="border-2 border-dashed border-orange-300 rounded p-2 text-center cursor-pointer hover:border-orange-500 bg-orange-50">
                  <input {...getInputProps()} />
                  <p className="text-xs">Kéo thả hoặc click</p>
                </div> */}

                {uploadedImages.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1">Ảnh:</p>
                    <div className="grid grid-cols-3 gap-1">
                      {uploadedImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`img-${i}`}
                          className="h-16 object-cover rounded cursor-pointer hover:opacity-75"
                          // onClick={() => addImage(img)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* <div className="grid grid-cols-2 gap-1">
                  <Button onClick={() => addRectangle('#FF0000')} variant="outline" size="sm" className="text-xs">
                    Hình vuông
                  </Button>
                  <Button onClick={() => deleteSelected()} variant="outline" size="sm" className="text-xs">
                    <FiTrash2 size={14} className="mr-1" /> Delete
                  </Button>
                  <Button onClick={clearAll} variant="outline" size="sm" className="col-span-2 text-xs">
                    Clear All
                  </Button>
                  <Button onClick={exportDesign} size="sm" className="col-span-2 text-xs bg-orange-600">
                    <FiDownload size={14} className="mr-1" /> Export
                  </Button>
                </div> */}
              </div>
            )}

            {currentTab !== 'custom' && (
              <div className="flex-1 overflow-y-auto px-4 pb-20">
                <p className="text-sm text-gray-600">Content for {bottomTabs.find(t => t.id === currentTab)?.title}</p>
              </div>
            )}

            <DrawerFooter className="shrink-0 border-t">
              <DrawerClose asChild>
                <Button variant="outline">Đóng</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};