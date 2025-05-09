import type { PropsWithChildren } from "react";

export default function PresentationLayout(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
