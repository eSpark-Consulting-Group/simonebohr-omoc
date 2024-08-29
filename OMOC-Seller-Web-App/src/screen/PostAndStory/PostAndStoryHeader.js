import React, { useState } from "react";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";

function PostAndStoryHeader({
  isDraft,
  isSchedule,
  isStory,
  sortValue,
  setSortValue,
  setOffset,
}) {
  const [openSortyBy, setOpenSortyBy] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between max-sm:flex-wrap">
        <div>
          <h2 className="text-3xl font-bold mb-1">
            {isDraft
              ? strings.DRAFT
              : isSchedule
              ? strings.SCHEDULED_POST
              : isStory
              ? strings.STORIES
              : strings.POST_STORY_DASHBOARD}
          </h2>
          <p className="text-sm font-normal text-[#7A7A7A]">
            {strings.MANGE_YOUR_SHOP_ORDER}
          </p>
        </div>
        <div
          onClick={() => {
            setCreatePostModal(!createPostModal);
          }}
          className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
        >
          <Icon icon="bi:plus" color="white" width="32" height="32" />
          <p>{strings.CREATE_POST}</p>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mb-4 mt-8">
        <div className="flex items-center gap-10 rounded-xl bg-white py-4 mt-2 px-8 invoiceHeader-class text-sm font-semibold text-[#C2C2C2]">
          <NavLink to={"/Profile/Post-story/Post"}>{strings.POSTS}</NavLink>
          <NavLink to={"/Profile/Post-story/Story"}>{strings.STORIES}</NavLink>
          <NavLink to={"/Profile/Post-story/Draft"}>{strings.DRAFT}</NavLink>
          <NavLink to={"/Profile/Post-story/Scheduled"}>
            {strings.SCHEDULED}
          </NavLink>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-right mt-2">
          <label
            htmlFor="search"
            className={`${
              isStory
                ? "flex py-2 px-5 justify-between items-center rounded-3xl bg-white"
                : "hidden"
            }`}
          >
            <input
              className="w-full py-1"
              type="text"
              id="search"
              placeholder={placeholder.SEARCH_NAME}
            />
            <Icon icon="uil:search" width="24" height="24" />
          </label>
          <div
            onClick={() => {
              setOpenSortyBy(!openSortyBy);
            }}
            className="relative flex items-center gap-2 rounded-xl bg-white py-3 px-5"
          >
            <p className="text-base font-normal">{sortValue?.text}</p>
            <Icon icon="iconamoon:arrow-down-2-thin" width="28" height="28" />
            {openSortyBy && (
              <SortyByModal setSortValue={setSortValue} setOffset={setOffset} />
            )}
          </div>
        </div>
      </div>
      <CreatePostModal
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
      />
    </div>
  );
}

export default PostAndStoryHeader;

function SortyByModal({ setSortValue, setOffset }) {
  return (
    <div className="rounded-xl bg-white absolute top-14 p-2.5 text-sm font-medium w-44 right-0 shadow-2xl z-10">
      <p
        onClick={() => {
          setSortValue({ text: strings.NEWEST, status: true });
          setOffset(1);
        }}
        className="hover:!text-[#0094FF] hover:bg-[#E8F5FF] cursor-pointer rounded-xl p-2"
      >
        {strings.NEWEST}
      </p>
      <p
        onClick={() => {
          setOffset(1);
          setSortValue({ text: strings.OLDEST, status: false });
        }}
        className="hover:!text-[#0094FF] hover:bg-[#E8F5FF] cursor-pointer rounded-xl p-2"
      >
        {strings.OLDEST}
      </p>
    </div>
  );
}
