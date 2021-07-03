import sanitizeHtml from "sanitize-html";

export const sanitizeBody = (body: string): string =>
  sanitizeHtml(body, {
    ...sanitizeHtml.defaults,
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
  });
