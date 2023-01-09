import React from "react";
import BatchSelection from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import { BatchSelectionProps } from "./batch-selection";

export default {
  title: "Batch Selection/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    colorTheme: {
      options: ["dark", "light", "white", "transparent"],
      control: {
        type: "select",
      },
    },
  },
};

export const DefaultStory = ({ ...args }: BatchSelectionProps) => {
  return (
    <BatchSelection {...args}>
      <IconButton onAction={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onAction={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onAction={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};

DefaultStory.storyName = "default";
DefaultStory.story = {
  args: {
    disabled: false,
    hidden: false,
    selectedCount: 0,
    colorTheme: "transparent",
  },
};
