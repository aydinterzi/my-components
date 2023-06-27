"use client";

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PopoverProps = {
   as?: string;
    children: React.ReactNode;
  [key: string]: any;
}

type ButtonProps = {
  as?: string;
  children: React.ReactNode;
  [key: string]: any;
}

type PanelProps = {
  as?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const PopoverContext = createContext("");

function Popover({as="div",children,...props }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const data = {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen(!open),
  };
  const button = children.find((child) => child.type.name === "Button");
  const panel = children.find((child) => child.type.name === "Panel");
  return createElement(
    as,
    props,
    <PopoverContext.Provider value={data}>
      {button}
      {open && panel}
    </PopoverContext.Provider>
  );
}

function Button({ as = "button", children, ...props }:ButtonProps) {
  const { toggle } = useContext(PopoverContext);
  return createElement(as, { onClick: toggle, ...props }, children);
}

function Panel({ as = "nav", children, ...props }: PanelProps) {
  const panelRef = useRef();
  const { close } = useContext(PopoverContext);
  console.log(typeof children)
  useEffect(() => {
    const clickListener = (e) => {
      if (!e.composedPath().includes(panelRef.current)) {
        close();
      }
    };
    document.addEventListener("click", clickListener);

    return () => document.removeEventListener("click", clickListener);
  }, []);
  return createElement(as, { ref: panelRef, ...props },typeof children === "function" ? children(close) : children);
}

Popover.Button = Button;
Popover.Panel = Panel;

export default Popover;
