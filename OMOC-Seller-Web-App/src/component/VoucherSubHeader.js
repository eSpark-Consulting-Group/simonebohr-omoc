import React from 'react'
import { placeholder, strings } from '../utils/strings';

const VoucherSubHeader = () => {
  return (
    <>
      <div className="bg-white h-24 flex items-center px-5 rounded-xl">
        <div className='flex w-full justify-between'>

         <p className="w-full">{strings.VOUCHER_NAME}</p>
         <p className="w-full ml-5">{strings.TOTAL_VOUCHER}</p>
         <p className="w-full text-center lg:text-start">{strings.TYPE}</p>
         <p className="w-full">{strings.STATUS}</p>
        </div>
        <div>

          <input
          className="h-12 border-[1px] rounded-[30px] p-3"
          placeholder={placeholder.SEARCH_VOUCHER}
        />
        </div>
      </div>
    </>
  );
}

export default VoucherSubHeader
