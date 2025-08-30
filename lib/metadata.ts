import { Metadata } from "next";
import { removeFalsy } from "./parse";

export const formatMetadata = ({
  title,
  description,
  image = "/logoOG.png",
  twitter,
  openGraph,
  ...rest
}: Metadata & { image?: string }): Metadata => ({
  ...rest,
  title,
  description,
  twitter: {
    ...twitter,
    ...removeFalsy({
      title: title,
      description: description,
      images: image && [image],
    }),
  },
  openGraph: {
    ...openGraph,
    ...removeFalsy({
      title: title,
      description: description,
      images: image && [image],
    }),
  },
});
