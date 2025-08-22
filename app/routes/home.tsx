import type { Route } from "./+types/home";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSection,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Clipboard,
  Check,
  Sun,
  Moon,
  Monitor,
  Menu,
  Columns2,
  Rows2,
  Square,
} from "lucide-react";
import { useTheme } from "~/components/theme-provider";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";
import { RadioCardGroup, RadioCardItem } from "~/components/ui/radio-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { markdownToMrkdwn } from "./markdown-to-mrkdwn";
import { BsMarkdown, BsSlack } from "react-icons/bs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Markdown Slack" },
    {
      name: "description",
      content: "Convert regular markdown to Slack mrkdwn format",
    },
  ];
}

const placeholder = `Paste your markdown here...

Example:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
\`inline code\``;

type Layout = "vertical" | "horizontal" | "tabbed";

export default function MarkdownConverter() {
  const [convertedText, setConvertedText] = useState(
    markdownToMrkdwn(placeholder),
  );
  const [copied, setCopied] = useState(false);
  const { theme, themePreference, setThemePreference } = useTheme();
  const [layout, setLayout] = useState<Layout>("horizontal");

  const editorTheme = theme === "dark" ? xcodeDark : xcodeLight;

  function onOriginalEditorChange(text: string) {
    setConvertedText(markdownToMrkdwn(text));
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  const originalEditor = (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BsMarkdown />
          Original
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CodeMirror
          theme={editorTheme}
          extensions={[
            markdown({
              base: markdownLanguage,
              codeLanguages: languages,
            }),
            EditorView.lineWrapping,
          ]}
          placeholder={placeholder}
          onChange={onOriginalEditorChange}
        />
      </CardContent>
    </Card>
  );

  const convertedEditor = (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start">
        <CardTitle className="text-lg font-medium flex-1 flex items-center gap-2">
          <BsSlack />
          Converted
        </CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={copyToClipboard} size="icon" variant="ghost">
              {copied ? <Check /> : <Clipboard />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? "Copied!" : "Copy to clipboard"}
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="flex-1">
        <CodeMirror
          theme={editorTheme}
          extensions={[
            markdown({
              base: markdownLanguage,
              codeLanguages: languages,
            }),
            EditorView.lineWrapping,
          ]}
          value={convertedText}
          onChange={setConvertedText}
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSection>
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
            </DropdownMenuSection>
            <DropdownMenuSection>
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
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Convert Markdown to Slack mrkdwn
        </h1>
        <p className="text-muted-foreground">
          Paste your regular markdown on the left and get Slack-formatted text
          on the right
        </p>
      </header>

      <div
        data-layout={layout}
        className="flex-1 grid gap-4 data-[layout=vertical]:grid-cols-1 data-[layout=horizontal]:grid-cols-2 data-[layout=tabbed]:grid-cols-1"
      >
        {layout !== "tabbed" && (
          <>
            {originalEditor}
            {convertedEditor}
          </>
        )}
        {layout === "tabbed" && (
          <Tabs defaultValue="original">
            <TabsList>
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
            </TabsList>
            <TabsContent value="original">{originalEditor}</TabsContent>
            <TabsContent value="converted">{convertedEditor}</TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
