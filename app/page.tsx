"use client"

import Popover from "@/components/popover";

export default function Home() {
  return (
    <div className="w-[1200px] mt-10 mx-auto">
      <Popover className="relative inline-block">
        <Popover.Button className="border-2 rounded-lg p-1 transition hover:shadow-lg duration-150">More</Popover.Button>
        <Popover.Panel className="absolute left-5 top-12 border-2 rounded-lg p-2 w-40 list-none">
          {(close)=> (
            <>
              <li>
                <a href="#">Item 1</a>
              </li>
              <li>
                <a href="#">Item 2</a>
              </li>
          <button onClick={close}>close</button>
        </>)
        }
        </Popover.Panel>
      </Popover>
    </div>
  );
}
