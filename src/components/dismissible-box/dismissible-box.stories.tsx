import React from "react";
import { ComponentStory } from "@storybook/react";

import DismissibleBox from ".";
import Box from "../box";
import Typography from "../typography";
import VerticalDivider from "../vertical-divider";
import Image from "../image";
import point from "../../../.assets/point.svg";

const children = `Well, that's certainly good to know. Your head is not an artifact!
Maybe if we felt any human loss as keenly as we feel one of those
close to us, human history would be far less bloody. Wouldn't that
bring about chaos? Shields up! Rrrrred alert! Travel time to the
nearest starbase? I'm afraid I still don't understand, sir. You
enjoyed that. The Enterprise computer system is controlled by three
primary main processor cores, cross-linked with a redundant
melacortz ramistat, fourteen kiloquad interface modules. Well,
that's certainly good to know. Your head is not an artifact! Rrrrred
alert! Rrrrred alert! Rrrrred alert!`;

export const DefaultLightVariant: ComponentStory<
  typeof DismissibleBox
> = () => {
  return (
    <Box p={2}>
      <DismissibleBox onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};

export const DefaultDarkVariant: ComponentStory<typeof DismissibleBox> = () => {
  return (
    <Box p={2}>
      <DismissibleBox variant="dark" onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};

export const WithNoLeftBorderHighlight: ComponentStory<
  typeof DismissibleBox
> = () => {
  return (
    <Box p={2}>
      <DismissibleBox mb={2} hasBorderLeftHighlight={false} onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};

export const WidthOverridden: ComponentStory<typeof DismissibleBox> = () => {
  return (
    <Box p={2}>
      <DismissibleBox width="650px" onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};
