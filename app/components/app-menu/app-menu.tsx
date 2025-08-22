import { Sun, Moon, Monitor, Columns2, Rows2, Square } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../ui/drawer";
import { RadioCardGroup, RadioCardItem } from "../ui/radio-card";
import { useTheme } from "../theme-provider";
import { useLayout } from "../layout-provider";

export function AppMenu() {
  const { themePreference, setThemePreference } = useTheme();
  const { layout, setLayout } = useLayout();

  return (
    <Drawer direction="right">
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerContent>
          <div>
            <RadioCardGroup value={layout} onValueChange={setLayout}>
              <RadioCardItem value="horizontal">
                <Columns2 />
                Horizontal
              </RadioCardItem>
              <RadioCardItem value="vertical">
                <Rows2 />
                Vertical
              </RadioCardItem>
              <RadioCardItem value="tabbed">
                <Square />
                Tabbed
              </RadioCardItem>
            </RadioCardGroup>
          </div>
          <div>
            <RadioCardGroup
              value={themePreference}
              onValueChange={setThemePreference}
            >
              <RadioCardItem value="light">
                <Sun />
                Light
              </RadioCardItem>
              <RadioCardItem value="dark">
                <Moon />
                Dark
              </RadioCardItem>
              <RadioCardItem value="system">
                <Monitor />
                System
              </RadioCardItem>
            </RadioCardGroup>
          </div>
        </DrawerContent>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
