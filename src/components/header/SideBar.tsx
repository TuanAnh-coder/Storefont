"use client";

import { useState } from "react";
import { FiChevronRight, FiX } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BsGift, BsEmojiSunglasses } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
import { IoShirtOutline } from "react-icons/io5";

interface MenuItem {
  title: string;
  icon?: JSX.Element;
  children?: string[];
}

const MENU: MenuItem[] = [
  {
    title: "Order Tracking",
    icon: <MdOutlineLocalShipping size={20} />,
  },
  {
    title: "Thanksgiving",
    icon: <BsEmojiSunglasses size={20} />,
  },
  {
    title: "Christmas",
    icon: <BsGift size={20} />,
  },
  {
    title: "Products",
    icon: <IoShirtOutline size={20} />,
    children: ["T-Shirts", "Hoodies", "Accessories", "Mugs"],
  },
  {
    title: "Explore Designs",
    icon: <BsEmojiSunglasses size={20} />,
  },
  {
    title: "Free E-Card",
    icon: <BsGift size={20} />,
  },
  {
    title: "Blog",
    icon: <FaBlog size={20} />,
  },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* OverLay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-xl z-50 
        transition-transform duration-300 overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <h2 className="text-base sm:text-lg font-semibold">Menu</h2>
          <FiX size={24} onClick={onClose} className="cursor-pointer hover:text-gray-600 transition-colors" />
        </div>

        {/* Menu content */}
        <ul className="flex flex-col p-2 sm:p-3">
          {MENU.map((item, idx) => (
            <li key={idx} className="border-b py-2 sm:py-3">
              <div
                className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded transition-colors"
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {item.icon}
                  <span className="font-medium text-sm sm:text-base">{item.title}</span>
                </div>

                {item.children && (
                  <FiChevronRight
                    size={18}
                    className={`transition-transform flex-shrink-0 ${
                      openIndex === idx ? "rotate-90" : ""
                    }`}
                  />
                )}
              </div>

              {/* Sub menu */}
              {item.children && openIndex === idx && (
                <ul className="pl-8 sm:pl-10 mt-2 space-y-2 text-xs sm:text-sm text-gray-600">
                  {item.children.map((child, cIdx) => (
                    <li key={cIdx} className="cursor-pointer hover:text-orange-600 transition-colors">
                      {child}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Footer small links */}
          <div className="mt-4 p-2 sm:p-3 text-xs sm:text-sm text-gray-700 space-y-2">
            <p className="cursor-pointer hover:text-orange-600 transition-colors">Delivery</p>
            <p className="cursor-pointer hover:text-orange-600 transition-colors">Returns</p>
            <p className="cursor-pointer hover:text-orange-600 transition-colors">Help Center</p>
          </div>
        </ul>
      </div>
    </>
  );
}
