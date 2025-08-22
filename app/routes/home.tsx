import type { Route } from "./+types/home";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { markdownToMrkdwn } from "./markdown-to-mrkdwn";
import { BsMarkdown, BsSlack } from "react-icons/bs";
import { Editor, EditorCard, EditorHeader } from "~/components/editor";
import { CopyButton } from "~/components/copy-button";
import { AppMenu } from "~/components/app-menu/app-menu";
import { useLayout } from "~/components/layout-provider";

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

export default function MarkdownConverter() {
  const [originalText, setOriginalText] = useState(placeholder);
  const [convertedText, setConvertedText] = useState(
    markdownToMrkdwn(originalText),
  );
  const { layout } = useLayout();

  function onOriginalTextChange(text: string) {
    setOriginalText(text);
    setConvertedText(markdownToMrkdwn(text));
  }

  const originalEditor = (
    <EditorCard>
      <EditorHeader>
        <BsMarkdown />
        Original
      </EditorHeader>
      <Editor value={originalText} onChange={onOriginalTextChange} />
    </EditorCard>
  );

  const convertedEditor = (
    <EditorCard>
      <EditorHeader>
        <BsSlack />
        Converted
      </EditorHeader>
      <Editor value={convertedText} onChange={setConvertedText}>
        <CopyButton getContent={() => convertedText} />
      </Editor>
    </EditorCard>
  );

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      <div className="absolute top-4 right-4">
        <AppMenu />
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
