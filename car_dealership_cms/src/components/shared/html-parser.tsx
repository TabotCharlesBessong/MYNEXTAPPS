import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";

export const HTMLParser = ({ html }: { html: string }) => {
  return parse(sanitizeHtml(html));
};
