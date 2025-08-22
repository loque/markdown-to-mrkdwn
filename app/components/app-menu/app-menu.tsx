import {
  Sun,
  Moon,
  Monitor,
  Columns2,
  Rows2,
  Square,
  Menu,
} from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent } from "../ui/drawer";
import { RadioCardGroup, RadioCardItem } from "../ui/radio-card";
import { useTheme } from "../theme-provider";
import { useLayout } from "../layout-provider";
import {
  MenuContainer,
  MenuSection,
  MenuSectionDescription,
  MenuSectionTitle,
} from "../ui/menu";

export function AppMenu() {
  const { themePreference, setThemePreference } = useTheme();
  const { layout, setLayout } = useLayout();

  return (
    <Drawer direction="right">
      <DrawerTrigger className="cursor-pointer">
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <MenuContainer>
          <MenuSection>
            <MenuSectionTitle>Layout</MenuSectionTitle>
            <MenuSectionDescription>
              Choose your preferred layout style. The "Tabbed" option is ideal
              for maximizing screen real estate on smaller devices.
            </MenuSectionDescription>
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
          </MenuSection>
          <MenuSection>
            <MenuSectionTitle>Theme</MenuSectionTitle>
            <MenuSectionDescription>
              Choose your preferred theme. The "System" option will follow your
              operating system's theme settings.
            </MenuSectionDescription>
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
          </MenuSection>
        </MenuContainer>
      </DrawerContent>
    </Drawer>
  );
}
