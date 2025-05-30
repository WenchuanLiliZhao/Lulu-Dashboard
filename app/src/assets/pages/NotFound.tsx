import type { PageShape } from "../object-shapes/Page";

const NotFound: PageShape = {
  info: {
    title: "Not Found",
    slug: "*",
  },
  content: <div>404 Not Found</div>,
};

export default NotFound;