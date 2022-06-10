import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";

import {
  StyledMenuFullscreen,
  StyledMenuFullscreenHeader,
} from "./menu-full-screen.style";
import { StyledMenuWrapper } from "../menu.style";
import MenuContext from "../menu.context";
import FocusTrap from "../../../__internal__/focus-trap";
import Events from "../../../__internal__/utils/helpers/events";
import Box from "../../box";
import IconButton from "../../icon-button";
import Icon from "../../icon";
import Portal from "../../portal";
import MenuDivider from "../menu-divider/menu-divider.component";

const MenuFullscreen = ({
  children,
  isOpen,
  startPosition = "left",
  onClose,
  ...rest
}) => {
  const menuWrapperRef = useRef();
  const menuContentRef = useRef();
  const { menuType } = useContext(MenuContext);

  const handleKeyDown = (ev) => {
    /* istanbul ignore else */
    if (Events.isEscKey(ev)) {
      onClose(ev);
    }
  };

  const scrollVariants = {
    light: "light",
    dark: "dark",
    white: "light",
    black: "dark",
  };

  const iconColors = {
    light: undefined,
    dark: "#FFFFFF",
    white: undefined,
    black: "#FFFFFF",
  };

  return (
    <li aria-label="menu-fullscreen">
      <Portal>
        <FocusTrap wrapperRef={menuWrapperRef} isOpen={isOpen}>
          <StyledMenuFullscreen
            data-component="menu-fullscreen"
            ref={menuWrapperRef}
            isOpen={isOpen}
            menuType={menuType}
            startPosition={startPosition}
            onKeyDown={handleKeyDown}
            {...rest}
          >
            <StyledMenuFullscreenHeader
              isOpen={isOpen}
              menuType={menuType}
              startPosition={startPosition}
            >
              <IconButton
                aria-label="menu fullscreen close button"
                onAction={onClose}
                data-element="close"
              >
                <Icon type="close" color={iconColors[menuType]} />
              </IconButton>
            </StyledMenuFullscreenHeader>
            <Box
              overflowY="auto"
              scrollVariant={scrollVariants[menuType]}
              width="100%"
              height="calc(100% - 40px)"
            >
              <StyledMenuWrapper
                data-component="menu"
                menuType={menuType}
                ref={menuContentRef}
                display="flex"
                flexDirection="column"
                role="list"
                inFullscreenView
              >
                {React.Children.map(children, (child, index) => (
                  <MenuContext.Provider
                    value={{
                      inFullscreenView: true,
                      menuType,
                      inMenu: true,
                    }}
                  >
                    {child}
                    {index < React.Children.count(children) - 1 && (
                      <MenuDivider />
                    )}
                  </MenuContext.Provider>
                ))}
              </StyledMenuWrapper>
            </Box>
          </StyledMenuFullscreen>
        </FocusTrap>
      </Portal>
    </li>
  );
};

MenuFullscreen.propTypes = {
  /** The child elements to render */
  children: PropTypes.node,
  /** Sets whether the component is open or closed */
  isOpen: PropTypes.bool,
  /** The start position for the component to open from */
  startPosition: PropTypes.oneOf(["left", "right"]),
  /** A callback to be called when the close icon is clicked or enter is pressed when focused */
  onClose: PropTypes.func.isRequired,
};

export default MenuFullscreen;
