import React, { useRef, useState } from "react";

import Dialog from ".";
import type { DialogProps } from ".";

import Textbox from "../textbox";
import Button from "../button";
import Toast from "../toast";
import Box from "../box";

export const DialogComponent = (props: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      title="My dialog"
      showCloseIcon
      onCancel={() => setIsOpen(false)}
      {...props}
    >
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithFirstFocusableElement = (
  props: Partial<DialogProps>
) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open title="My dialog" focusFirstElement={ref} {...props}>
      <Button ref={ref} onClick={() => {}}>
        Press me
      </Button>
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithToast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [openToast, setOpenToast] = useState(false);
  return (
    <>
      <Toast
        ref={toastRef}
        open={openToast}
        onDismiss={() => setOpenToast(false)}
      >
        Toast message 1
      </Toast>
      <Dialog open title="My dialog">
        <Button onClick={() => setOpenToast(true)}>Open Toast</Button>
      </Dialog>
    </>
  );
};

export const DialogBackgroundScrollTest = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog open title="My dialog" onCancel={() => {}}>
        <Textbox label="textbox" />
      </Dialog>
    </Box>
  );
};

export const DialogWithOpenToastsBackgroundScrollTest = () => {
  const toast1Ref = useRef<HTMLDivElement>(null);
  const toast2Ref = useRef<HTMLDivElement>(null);
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog
        open
        title="My dialog"
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" />
      </Dialog>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Box>
  );
};