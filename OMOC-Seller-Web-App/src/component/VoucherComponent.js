import React from 'react'
import { strings } from '../utils/strings';
import { Icon } from '@iconify/react';
import ManageOption from '../screen/OrdersScreens/ManageOption';
import ReactModal from 'react-modal';

const VoucherComponent = () => {
  return (
    <>
      <div className="bg-white h-24 flex items-center px-5 rounded-xl mt-5">
        <div className="flex w-4/6	">
          <div className="w-full">
            <p>Voucher summer</p>
            <p className="text-xs">23904810283</p>
          </div>
          <p className="w-full text-center mr-6 text-sm text-[#757575] font-semibold">
            999
          </p>
          <p className="w-full text-sm text-[#757575] font-semibold">
            Newsletter
          </p>
          <div>
            <p className="w-full">Active</p>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <div className="flex border-[1px] px-3 py-4 items-center gap-4 rounded-2xl	">
            <p className="w-full text-end">Manage</p>
            <Icon icon="simple-line-icons:arrow-up" rotate={2} />
          </div>
        </div>
      </div>
    </>
  );
}

export default VoucherComponent
