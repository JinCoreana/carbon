import * as React from "react";
import SplitButton from "./split-button.component";
import Button from "../button";
import { Accordion } from "../accordion";

import { buttonSubtextPreview } from "../../../cypress/locators/button";
import { keyCode, positionOfElement } from "../../../cypress/support/helper";
import { icon, getDataElementByValue } from "../../../cypress/locators";

import {
  splitToggleButton,
  additionalButton,
  additionalButtonsContainer,
  splitMainButtonDataComponent,
  mainButton,
  splitMainButton,
} from "../../../cypress/locators/split-button";
import { accordionDefaultTitle } from "../../../cypress/locators/accordion";

import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

const SplitButtonList = ({ ...props }) => {
  return (
    <SplitButton text="default text" {...props}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};

context("Tests for Split Button component", () => {
  describe("check props for Split Button component", () => {
    it.each(testData)(
      "should render Split Button text using %s as special characters",
      (text) => {
        CypressMountWithProviders(<SplitButtonList text={text} />);

        getDataElementByValue("main-text").should("have.text", text);
      }
    );

    it.each(testData)(
      "should render Split Button subtext with %s as special characters",
      (subtext) => {
        CypressMountWithProviders(
          <SplitButtonList size="large" subtext={subtext} />
        );

        buttonSubtextPreview().should("have.text", subtext);
      }
    );

    it("should check Split Button data element prop", () => {
      CypressMountWithProviders(
        <SplitButtonList data-element="split-button-cypress-element" />
      );

      splitMainButton().should(
        "have.attr",
        "data-element",
        "split-button-cypress-element"
      );
    });

    it("should check Split Button data role prop", () => {
      CypressMountWithProviders(
        <SplitButtonList data-role="split-button-cypress-role" />
      );

      splitMainButton().should(
        "have.attr",
        "data-role",
        "split-button-cypress-role"
      );
    });

    it.each(["left", "right"])(
      "should align the Split Button to the %s",
      (alignment) => {
        CypressMountWithProviders(<SplitButtonList align={alignment} />);

        splitMainButton().should("have.css", `margin-${alignment}`);
      }
    );

    it("should check Split Button is disabled", () => {
      CypressMountWithProviders(<SplitButtonList disabled />);

      mainButton().trigger("mouseover", { force: true });
      splitMainButton()
        .children()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it.each([
      ["after", "left"],
      ["before", "right"],
    ])(
      "should set position to %s for icon in a Split Button",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <SplitButtonList iconType="add" iconPosition={iconPosition}>
            IconPosition
          </SplitButtonList>
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should invoke Split Button component and expands", () => {
      CypressMountWithProviders(<SplitButtonList />);

      getDataElementByValue("dropdown").trigger("mouseover");
      additionalButton(0).should("be.visible");
      additionalButton(1).should("be.visible");
      additionalButton(2).should("be.visible");
      splitToggleButton().should("have.attr", "aria-expanded", "true");
    });

    it("should click a main element of Split Button component", () => {
      const callback = cy.stub();

      CypressMountWithProviders(<SplitButtonList onClick={callback} />);

      splitMainButtonDataComponent(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.called;
        });
    });

    it("should invoke Split Button component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <SplitButtonList />
        </Accordion>
      );

      accordionDefaultTitle()
        .trigger("keydown", keyCode("Enter"))
        .then(() => {
          getDataElementByValue("dropdown").trigger("mouseover");
          additionalButton(0).should("be.visible");
          additionalButton(1).should("be.visible");
          additionalButton(2).should("be.visible");
          splitToggleButton().should("have.attr", "aria-expanded", "true");
        });
    });

    it("should tab to the second Split Button", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton().eq(0).click();
      additionalButton(1).focus();
      splitToggleButton().eq(0).tab();
      mainButton(1).should("be.focused");
    });
  });

  describe("clicking one of the additional buttons", () => {
    it("should close SplitButton", () => {
      CypressMountWithProviders(<SplitButtonList />);

      splitToggleButton()
        .eq(0)
        .click()
        .then(() => {
          additionalButton(0).click();

          additionalButtonsContainer().should("not.exist");
        });
    });
  });

  describe.each(["Enter", "Space", "downarrow"])(
    "pressing %s key on the main button",
    (key) => {
      it("opens SplitButton list and focuses first button", () => {
        CypressMountWithProviders(<SplitButtonList />);

        splitToggleButton()
          .eq(0)
          .trigger("keydown", keyCode(key))
          .then(() => {
            additionalButton(0).should("be.focused");
          });
      });
    }
  );
  // https://github.com/cypress-io/cypress/issues/21511
  describe.skip("should check colors for Split Button component", () => {
    it.each([
      ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
    ])(
      "check %s type of Split Button uses %s as background color and %s as color and %s as border color",
      (buttonType, backgroundColor, color, borderColor) => {
        CypressMountWithProviders(<SplitButtonList buttonType={buttonType} />);

        mainButton().as("button");

        cy.get("@button").should(
          "have.css",
          "background-color",
          backgroundColor
        );
        cy.get("@button").should("have.css", "color", color);
        cy.get("@button").should("have.css", "border-color", borderColor);
      }
    );
  });
});
