import { Icon } from '@iconify/react';
import React from 'react'
import { placeholder, strings } from '../../utils/strings';

const showData = [
  { Region: "Region Name" },
  { Region: "Region Name" },
  { Region: "Region Name" },
  { Region: "Region Name" },
  { Region: "Region Name" },
  { Region: "Region Name" },
];

const ShippingCoverage = () => {
  return (
    <div className="w-3/4 m-6">
      <div className="bg-[#F2F2F2] h-full">
        <div className='className="md:flex justify-between "'></div>
        <div className='className="md:flex justify-between "'></div>
        <div className="flex items-center gap-8">
          <Icon icon="ep:arrow-up" color="black" rotate={3} />
          <h2 className="text-3xl font-bold mb-1">
            {strings.SHIPPING_COVERAGE_SETTINGS}
          </h2>
        </div>
        <div className="searchFieldClass flex justify-end">
          <label
            htmlFor="search"
            className="flex py-2 px-5 justify-between items-center w-1/3"
          >
            <input
              className="w-full py-1"
              type="text"
              id="search"
              placeholder={placeholder.SEARCH_REGION}
            />
            <Icon icon="uil:search" width="24" height="24" />
          </label>
        </div>
        <div className="rounded-xl bg-white my-4 !mb-3 p-4 flex justify-around items-center">
          <p className="text-xs font-semibold">{strings.REGION}</p>
          <p className="text-xs font-semibold ml-20">{strings.TAX}</p>
          <p className="text-xs font-semibold">
            {strings.ESTIMATED_SHIPPING_TIME}
          </p>
          <p className="text-xs font-semibold">{strings.MINIMUM_PRICE}</p>
        </div>
        {showData.map(() => {
          return (
            <>
              <div className='flex justify-between items-center'>
                <div className="flex border-b-2 py-4 justify-between w-full mx-10">
                  <p className="text-sm font-semibold">Region Name</p>
                  <p className="text-sm">$20</p>
                  <p className="text-sm">1-3 days</p>
                  <p className="text-sm">$50</p>
                </div>
                <Icon
                  icon="ph:dots-three-vertical-bold"
                  color="black"
                  rotate={2}
                  width={24}
                  height={24}
                  className="ml-10"
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ShippingCoverage
