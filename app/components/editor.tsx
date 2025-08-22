import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useTheme } from "./theme-provider";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";
import { cn } from "~/lib/utils";

export function EditorCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      {children}
    </Card>
  );
}

export function EditorHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardHeader>
      <CardTitle
        className={cn("text-lg font-medium flex items-center gap-2", className)}
        {...props}
      >
        {children}
      </CardTitle>
    </CardHeader>
  );
}

type EditorProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};
export function Editor({
  value,
  onChange,
  className,
  children,
  ...props
}: EditorProps) {
  const { theme } = useTheme();
  const editorTheme = theme === "dark" ? xcodeDark : xcodeLight;
  return (
    <CardContent className={cn("flex-1 relative", className)} {...props}>
      <CodeMirror
        theme={editorTheme}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          EditorView.lineWrapping,
        ]}
        value={value}
        onChange={onChange}
      />
      {children}
    </CardContent>
  );
}
