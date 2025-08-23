import { createContext, useContext, useEffect, useState } from "react";
import { useSessionStorage } from "~/lib/use-session-storage";

type Layout = "vertical" | "horizontal" | "tabbed";

type LayoutProviderProps = {
  defaultLayout?: Layout;
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
  defaultLayout = "horizontal",
  children,
  storageKey = "ui-layout",
}: LayoutProviderProps) {
  const [layout, setLayout] = useSessionStorage(storageKey, defaultLayout);

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
