import { Example_TimelineItems } from "../Components/Timeline/ExampleData";
import { Timeline } from "../Components/Timeline/Timeline";
import type { PageShape } from "../object-shapes/Page";

const Page_Timeline: PageShape = {
  info: {
    title: "Timeline",
    slug: "timeline",
  },
  content: <Timeline inputData={Example_TimelineItems} />,
};

export default Page_Timeline;