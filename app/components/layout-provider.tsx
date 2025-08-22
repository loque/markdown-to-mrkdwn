import { createContext, useContext, useEffect, useState } from "react";

type Layout = "vertical" | "horizontal" | "tabbed";

type LayoutProviderProps = {
  defaultLayout?: Layout;
  children: React.ReactNode;
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
  defaultLayout,
  children,
}: LayoutProviderProps) {
  const [layout, setLayout] = useState(defaultLayout ?? "horizontal");

  useEffect(() => {
    setLayout(defaultLayout ?? "horizontal");
  }, [defaultLayout]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
