import type { PageShape } from "../object-shapes/Page";

const Page_NotFound: PageShape = {
  info: {
    title: "Not Found",
    slug: "*",
  },
  content: <div>404 Not Found</div>,
};

export default Page_NotFound;