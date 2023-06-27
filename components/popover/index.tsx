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
  children: React.ReactNode;
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

function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const data = {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen(!open),
  };
  return (
    <PopoverContext.Provider value={data}>
      {children[0]}
      {open && children[1]}
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
  useEffect(() => {
    const clickListener = (e) => {
      if (!e.composedPath().includes(panelRef.current)) {
        close();
      }
    };
    document.addEventListener("click", clickListener);

    return () => document.removeEventListener("click", clickListener);
  }, []);
  return createElement(as, { ref: panelRef, ...props }, children);
}

Popover.Button = Button;
Popover.Panel = Panel;

export default Popover;
