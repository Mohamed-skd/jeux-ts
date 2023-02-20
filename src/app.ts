import { create, select, selectAll } from "./utils/ts/funcs.js";

// GLOBAL COMPONENTS
// page nav
const pageNav = select("#page-nav ul")!;
const pageSects = selectAll("main > section");
const pageSectsTitle = selectAll("section >h2");

const pageNavLink = (id: string, title: string) => {
  const listElem = create("li");
  const link = create("a", { href: `#${id}`, class: "link" });

  link.textContent = title;
  listElem.append(link);
  return listElem;
};

for (let x = 0; x < pageSects.length; x++) {
  const idSect = pageSects[x].getAttribute("id")!;
  const titleSect = pageSectsTitle[x].textContent!;

  pageNav.append(pageNavLink(idSect, titleSect));
}

// copyright
const copyright = select("#copyright")!;
const date = new Date();

copyright.textContent = `Tout droit réservé © ${date.getFullYear()}`;

// PAGES COMPONENTS
// autoloader
const pageContent = select("body > div")!;
const module = pageContent.getAttribute("id")!;

import(`./components/${module}/app.ts`)
  .then((res) => res.default())
  .catch(console.error);
