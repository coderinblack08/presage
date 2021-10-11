import axios from "axios";
import * as functions from "firebase-functions";
import isEqual from "lodash.isequal";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://joinpresage.com"
    : "http://localhost:3000";

export const generateHtml = functions.firestore
  .document("articles/{articleId}")
  .onUpdate(async (change) => {
    const ej1 = change.before.data()?.editorJSON;
    const ej2 = change.after.data()?.editorJSON;
    console.log(ej1, ej2, isEqual(ej1, ej2));
    if (isEqual(ej1, ej2) || !ej2) {
      return null;
    }
    const html = (
      await axios.post(`${baseURL}/api/generate-html`, {
        editorJSON: ej2,
      })
    ).data;
    console.log(html);
    return change.after.ref.set(
      {
        editorHTML: html,
      },
      { merge: true }
    );
  });
