import { Example_Issues_1 } from "../Components/Timeline/ExampleData/Example_Issues_1";
import { Example_Issues_2 } from "../Components/Timeline/ExampleData/Example_Issues_2";
import { Example_Issues_3 } from "../Components/Timeline/ExampleData/Example_Issues_3";
import { groupIssuesByField } from "../Components/Timeline/Shapes";
import { Timeline } from "../Components/Timeline/Timeline";
import type { PageShape } from "../object-shapes/Page";


const Example_Issues = [
  ...Example_Issues_1,
  ...Example_Issues_2,
  ...Example_Issues_3,
]

const Page_Timeline: PageShape = {
  info: {
    title: "Timeline",
    slug: "timeline",
  },
  content: <Timeline inputData={groupIssuesByField(Example_Issues, "vision")} />,
};

export default Page_Timeline;