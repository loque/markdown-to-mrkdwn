import { createContext, use, useContext, useEffect, useState } from "react";
import { useIsMobile } from "~/lib/use-is-mobile";
import { useSessionStorage } from "~/lib/use-session-storage";

type Layout = "vertical" | "horizontal" | "tabbed";

type LayoutProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

type LayoutProviderState = {
  layout: Layout;
  setLayout: (layout: Layout) => void;
};

const initialState: LayoutProviderState = {
  layout: "horizontal",
  setLayout: () => {},
};

const LayoutContext = createContext<LayoutProviderState>(initialState);

export function LayoutProvider({
  children,
  storageKey = "ui-layout",
}: LayoutProviderProps) {
  const isMobile = useIsMobile();
  const initialLayout = isMobile ? "tabbed" : "horizontal";
  console.debug(">>> initialLayout", initialLayout);
  const [layout, setLayout] = useSessionStorage(storageKey, initialLayout);

  function persistLayout(layout: Layout) {
    sessionStorage.setItem(storageKey, layout);
    setLayout(layout);
  }

  return (
    <LayoutContext.Provider value={{ layout, setLayout: persistLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
