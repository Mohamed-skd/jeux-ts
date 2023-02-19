import { select } from "./ts/funcs.js";

// GLOBAL COMPONENTS

// PAGES COMPONENTS
// autoloader
const pageContent = select("body > div");

if (pageContent) {
  const module = pageContent.getAttribute("id");

  if (module) {
    import(`./component/${module}/app.ts`)
      .then((res) => res.default())
      .catch(console.error);
  }
}
