import type { PageShape } from "../object-shapes/page";

const NotFound: PageShape = {
  info: {
    title: "Not Found",
    slug: "*",
  },
  content: <div>404 Not Found</div>,
};

export default NotFound;