import { Example_TimelineItems } from "../Components/TimelineItemShape";
import { TimelineRuler } from "../Components/TimelineRuler";
import type { PageShape } from "../object-shapes/Page";

const Timeline: PageShape = {
  info: {
    title: "Timeline",
    slug: "timeline",
  },
  content: <TimelineRuler inputData={Example_TimelineItems} />,
};

export default Timeline;