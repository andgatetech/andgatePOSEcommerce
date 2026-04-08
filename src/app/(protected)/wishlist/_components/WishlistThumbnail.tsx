import type { WishlistItem } from "./wishlistMockData";

export default function WishlistThumbnail({ item }: { item: WishlistItem }) {
  return (
    <div className="relative h-[112px] w-[112px] overflow-hidden rounded-[20px] bg-[#f5f7fa] max-sm:h-[88px] max-sm:w-[88px]">
      {item.thumbnail === "coffee" ? (
        <>
          <div className="absolute left-[34px] top-[18px] h-[76px] w-[34px] rounded-[8px] bg-[#d4a05b]" />
          <div className="absolute left-[38px] top-[22px] h-[68px] w-[26px] rounded-[6px] bg-[#f5deb7]" />
          <div className="absolute left-[37px] top-[31px] h-[20px] w-[28px] rounded-md bg-[#274c77]" />
          <div className="absolute left-[40px] top-[55px] h-[17px] w-[22px] rounded-full bg-[#f09b2b]" />
          <div className="absolute left-[44px] top-[12px] h-[7px] w-[13px] rounded-full bg-[#6a4721]" />
        </>
      ) : null}

      {item.thumbnail === "monitor" ? (
        <>
          <div className="absolute left-[18px] top-[37px] h-[34px] w-[55px] -rotate-[16deg] rounded-[10px] bg-[#ebedf1]" />
          <div className="absolute left-[23px] top-[42px] h-[24px] w-[45px] -rotate-[16deg] rounded-[8px] bg-[#ffffff]" />
          <div className="absolute left-[30px] top-[47px] h-[14px] w-[30px] -rotate-[16deg] rounded bg-[#d6dde8]" />
          <div className="absolute left-[58px] top-[30px] h-[40px] w-[15px] -rotate-12 rounded-[4px] bg-[#36383b]" />
          <div className="absolute left-[61px] top-[34px] h-[32px] w-[9px] -rotate-12 rounded-[3px] bg-[#4e5258]" />
          <div className="absolute left-[30px] top-[45px] h-[4px] w-[4px] rounded-full bg-[#f4c019]" />
        </>
      ) : null}

      {item.thumbnail === "vitamin" ? (
        <>
          <div className="absolute left-[18px] top-[18px] h-[70px] w-[40px] rounded-[16px] bg-[#ffffff]" />
          <div className="absolute left-[24px] top-[10px] h-[14px] w-[28px] rounded-[6px_6px_2px_2px] bg-[#f0f2f5]" />
          <div className="absolute left-[23px] top-[37px] h-[26px] w-[30px] rounded bg-[#f5a31b]" />
          <div className="absolute left-[60px] top-[18px] h-[68px] w-[32px] rounded-[4px] bg-[#f5a31b]" />
          <div className="absolute left-[64px] top-[22px] h-[60px] w-[24px] rounded-[3px] bg-[#fff0c8]" />
          <div className="absolute left-[65px] top-[35px] h-[14px] w-[22px] rounded-sm bg-[#f5a31b]" />
        </>
      ) : null}
    </div>
  );
}
