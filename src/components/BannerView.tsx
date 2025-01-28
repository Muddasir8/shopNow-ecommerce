import React from 'react'
import type { Banner } from '../../sanity.types'
import BannerHome from "@/components/BannerHome";

interface BannerProps {
  banner:Banner[]
}

const BannerView = ({banner}:BannerProps) => {
  return (
    <div>
      {banner.map((b, index) => (
        <BannerHome key={index} banner={b} />
      ))}
    </div>
  )
}

export default BannerView