import type { ReactNode } from "react";

export interface PageShape {
  info: {
    title: string;
    slug: string;
  };
  content: ReactNode;
}