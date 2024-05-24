import { useEffect } from "react";

export default function Title(title) {
  useEffect(
    () => {
      document.title = `Swiftbank - ${title}`;
    },
    // eslint-disable-next-line
    [title]
  );
}
