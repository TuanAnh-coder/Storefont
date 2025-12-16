"use client"

import { api } from "@/utils/api"
import { animate } from "animejs"
import Link from "next/link"
import { useState } from "react"
import { useEffect, useRef } from "react"
import { FcMoneyTransfer } from "react-icons/fc"

const TopBar = () => {
  const { data: campaign } = api.medusa.listCampaigns.useQuery()
  if (!campaign || campaign.length === 0) return null

  const item = campaign[0]

  return (
    <div className="bg-[#FF6600] p-1 md:p-2">
      <p className="text-white font-light text-xs md:text-sm flex gap-1 justify-center items-center sale whitespace-nowrap">
        <FcMoneyTransfer size={20} />
        <Link
          href={item.campaign_identifier}
          className="underline hover:no-underline"
        >
          {item.name}:
        </Link>
        <span>{item.description}</span>
      </p>
    </div>
  )
}

export { TopBar }
