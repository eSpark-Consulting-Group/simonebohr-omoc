import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'

export default function RightSideEmbededPost() {

  return (
    <div className="bg-white w-[280px] p-4 flex flex-col gap-6 itemc">
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium">Embed Post</h1>
        <Icon icon="bitcoin-icons:cross-outline" width="20px" height="20px" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center w-[216px] h-[36px] border rounded-[4px] p-[10px] gap-2">
          <div className="flex items-center">
            <Icon
              icon="ep:search"
              width="13px"
              height="13px"
              style={{ color: "#757575" }}
            />
            <input
              type="text"
              className="outline-none ps-[10px] placeholder:text-[12px] placeholder:text-textcolor"
              placeholder="Search"
            />
          </div>
        </div>
        <div>
          <Icon icon="solar:sort-linear" width="24px" height="24px" />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3">
    
      <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
        <div className="flex items-center gap-2">
          <img className='size-[76px] object-cover rounded-lg' src="https://image.made-in-china.com/2f0j00TJQiEjcWZkbn/Popular-Summer-Baby-Clothes-Short-Sleeves-Shirt-Pants-Pajamas-Set-Solid-Colar-Modal-Children-Clothing-Loose-Sweet-Kids-Pajamas.webp" alt="" />
          <div className='w-[124px]'>
          <div><span className="text-xs  text-[#242424]">Yellow Sweater batch XX!</span></div>
          <div><span className="text-xs  text-textcolor"> Post by @aliatu23 </span></div>
          </div>
        </div>
        <label
          className="flex items-center justify-center  relative"
          htmlFor=""
        >
          <input
            type="checkbox"
            className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
          />

          <Icon
            className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
            icon="ic:sharp-check"
            width="16px"
            height="16px"
          />
        </label>
      </label>
      <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
        <div className="flex items-center gap-2">
          <img className='size-[76px] rounded-lg object-cover object-top' src="https://byhand.in/wp-content/uploads/2023/03/yellow-2.jpg" alt="" />
          <div className='w-[124px]'>
          <div><span className="text-xs  text-[#242424]">Yellow Sweater batch XX!</span></div>
          <div><span className="text-xs  text-textcolor"> Post by @aliatu23 </span></div>
          </div>
        </div>
        <label
          className="flex items-center justify-center  relative"
          htmlFor=""
        >
          <input
            type="checkbox"
            className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
          />

          <Icon
            className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
            icon="ic:sharp-check"
            width="16px"
            height="16px"
          />
        </label>
      </label>
      <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
        <div className="flex items-center gap-2">
          <img className='size-[76px] rounded-lg object-cover object-top' src="https://mandala-fashion.com/cdn/shop/files/SH03JE10-black01_1200x.jpg?v=1706084785" alt="" />
          <div className='w-[124px]'>
          <div><span className="text-xs  text-[#242424]">Yellow Sweater batch XX!</span></div>
          <div><span className="text-xs  text-textcolor"> Post by @aliatu23 </span></div>
          </div>
        </div>
        <label
          className="flex items-center justify-center  relative"
          htmlFor=""
        >
          <input
            type="checkbox"
            className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
          />

          <Icon
            className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
            icon="ic:sharp-check"
            width="16px"
            height="16px"
          />
        </label>
      </label>
      <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
        <div className="flex items-center gap-2">
          <img className='size-[76px] rounded-lg object-cover object-top' src="https://m.media-amazon.com/images/I/51NRY0TKq7L._AC_UY1100_.jpg" alt="" />
          <div className='w-[124px]'>
          <div><span className="text-xs  text-[#242424]">Yellow Sweater batch XX!</span></div>
          <div><span className="text-xs  text-textcolor"> Post by @aliatu23 </span></div>
          </div>
        </div>
        <label
          className="flex items-center justify-center  relative"
          htmlFor=""
        >
          <input
            type="checkbox"
            className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
          />

          <Icon
            className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
            icon="ic:sharp-check"
            width="16px"
            height="16px"
          />
        </label>
      </label>
   
    </div>
    <span className='font-medium text-xs text-textcolor w-[192px] text-center mx-auto'>you can embed max 3 post for this settings. update the grid settings to add more.</span>
    <button className="rounded-lg bg-[#9039FF] h-[35px] px-[10px] text-xs text-white">
    Add Embed Post
    </button>
  </div>
  )
}
