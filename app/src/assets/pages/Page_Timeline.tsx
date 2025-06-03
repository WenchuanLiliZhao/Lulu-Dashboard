import { groupIssuesByField, Example_Issues } from "../Components/Timeline/Shapes";
import { Timeline } from "../Components/Timeline/Timeline";
import type { PageShape } from "../object-shapes/Page";

const Page_Timeline: PageShape = {
  info: {
    title: "Timeline",
    slug: "timeline",
  },
  content: <Timeline inputData={groupIssuesByField(Example_Issues, "vision")} />,
};

export default Page_Timeline;