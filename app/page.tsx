"use client"

import Popover from "@/components/popover";

export default function Home() {
  return (
    <>
      <Popover>
        <Popover.Button>click me</Popover.Button>
        <Popover.Panel>panel</Popover.Panel>
      </Popover>
    </>
  );
}
