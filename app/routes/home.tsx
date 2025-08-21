import type { Route } from "./+types/home";
import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Copy, Check, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "~/components/theme-provider";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Markdown Slack" },
    {
      name: "description",
      content: "Convert regular markdown to Slack mrkdwn format",
    },
  ];
}

// Convert regular markdown to Slack mrkdwn format
function convertToSlackMrkdwn(markdown: string): string {
  let slackMrkdwn = markdown;

  slackMrkdwn = slackMrkdwn.replace(/^###### (.*$)/gm, "_$1_");
  slackMrkdwn = slackMrkdwn.replace(/^##### (.*$)/gm, "_$1_");
  slackMrkdwn = slackMrkdwn.replace(/^#### (.*$)/gm, "_$1_");
  slackMrkdwn = slackMrkdwn.replace(/^### (.*$)/gm, "_$1_");
  slackMrkdwn = slackMrkdwn.replace(/^## (.*$)/gm, "_$1_");
  slackMrkdwn = slackMrkdwn.replace(/^# (.*$)/gm, "_$1_");

  // Bold - convert **text** to *text*
  slackMrkdwn = slackMrkdwn.replace(/\*\*(.*?)\*\*/g, "*$1*");

  // Italic - convert *text* to _text_
  slackMrkdwn = slackMrkdwn.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "_$1_");

  // Code blocks - convert \`\`\`code\`\`\` to \`\`\`code\`\`\`
  slackMrkdwn = slackMrkdwn.replace(/```([\s\S]*?)```/g, "```$1```");

  // Inline code - convert `code` to `code`
  slackMrkdwn = slackMrkdwn.replace(/`([^`]+)`/g, "`$1`");

  // Links - convert [text](url) to <url|text>
  slackMrkdwn = slackMrkdwn.replace(/\[([^\]]+)\]$$([^)]+)$$/g, "<$2|$1>");

  // Strikethrough - convert ~~text~~ to ~text~
  slackMrkdwn = slackMrkdwn.replace(/~~(.*?)~~/g, "~$1~");

  // Lists - convert - to •
  slackMrkdwn = slackMrkdwn.replace(/^- (.*$)/gm, "• $1");
  slackMrkdwn = slackMrkdwn.replace(/^\* (.*$)/gm, "• $1");

  // Numbered lists - keep as is
  slackMrkdwn = slackMrkdwn.replace(/^\d+\. (.*$)/gm, "$&");

  return slackMrkdwn;
}

const placeholder = `Paste your markdown here...

Example:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
\`inline code\``;

export default function MarkdownConverter() {
  const [outputText, setOutputText] = useState(
    convertToSlackMrkdwn(placeholder),
  );
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();

  const editorTheme = theme === "dark" ? xcodeDark : xcodeLight;

  function handleMarkdownUpdate(text: string) {
    setOutputText(convertToSlackMrkdwn(text));
  }

  function handleInputChange(text: string) {
    handleMarkdownUpdate(text);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Markdown to Slack mrkdwn Converter
        </h1>
        <p className="text-muted-foreground">
          Paste your regular markdown on the left and get Slack-formatted text
          on the right
        </p>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Input Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Regular Markdown
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
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start">
            <CardTitle className="text-lg font-semibold flex-1">
              Slack Markdown
            </CardTitle>
            <Button onClick={copyToClipboard}>
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
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
              value={outputText}
              onChange={setOutputText}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
