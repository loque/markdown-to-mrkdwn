import { createContext, useContext, useEffect, useState } from "react";

type MenuProviderProps = {
  defaultOpen?: boolean;
  children: React.ReactNode;
};

type MenuProviderState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const initialState: MenuProviderState = {
  open: false,
  setOpen: () => {},
};

const MenuContext = createContext<MenuProviderState>(initialState);

export function MenuProvider({ defaultOpen, children }: MenuProviderProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  useEffect(() => {
    setOpen(defaultOpen ?? false);
  }, [defaultOpen]);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
