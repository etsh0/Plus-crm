import img from "@/assets/light-pillar-1776934798991.png"
import Image from "next/image"

export const Hero = () => {
  return (
    <>
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            <Image className="w-full h-full" src={img} alt="" />
        </div>
    </>
  )
}
