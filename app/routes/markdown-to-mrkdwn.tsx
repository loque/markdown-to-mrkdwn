// Convert regular markdown to Slack mrkdwn format
export function markdownToMrkdwn(markdown: string): string {
  let mrkdwn = markdown;

  // Headers
  mrkdwn = mrkdwn.replace(/^###### (.*$)/gm, "_$1_");
  mrkdwn = mrkdwn.replace(/^##### (.*$)/gm, "_$1_");
  mrkdwn = mrkdwn.replace(/^#### (.*$)/gm, "_$1_");
  mrkdwn = mrkdwn.replace(/^### (.*$)/gm, "_$1_");
  mrkdwn = mrkdwn.replace(/^## (.*$)/gm, "_$1_");
  mrkdwn = mrkdwn.replace(/^# (.*$)/gm, "_$1_");

  // Bold - convert **text** to *text*
  mrkdwn = mrkdwn.replace(/\*\*(.*?)\*\*/g, "*$1*");

  // Italic - convert *text* to _text_
  mrkdwn = mrkdwn.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "_$1_");

  // Code blocks - convert \`\`\`code\`\`\` to \`\`\`code\`\`\`
  mrkdwn = mrkdwn.replace(/```([\s\S]*?)```/g, "```$1```");

  // Inline code - convert `code` to `code`
  mrkdwn = mrkdwn.replace(/`([^`]+)`/g, "`$1`");

  // Links - convert [text](url) to <url|text>
  mrkdwn = mrkdwn.replace(/\[([^\]]+)\]$$([^)]+)$$/g, "<$2|$1>");

  // Strikethrough - convert ~~text~~ to ~text~
  mrkdwn = mrkdwn.replace(/~~(.*?)~~/g, "~$1~");

  // Lists - convert - to •
  mrkdwn = mrkdwn.replace(/^- (.*$)/gm, "• $1");
  mrkdwn = mrkdwn.replace(/^\* (.*$)/gm, "• $1");

  // Numbered lists - keep as is
  mrkdwn = mrkdwn.replace(/^\d+\. (.*$)/gm, "$&");

  return mrkdwn;
}
