import { POD_DATA_COMPONENT } from "../pod/locators";
import { CY_ROOT } from "../locators";
import GRID_COMPONENT from "./locators";

export const pod = (index) => cy.get(POD_DATA_COMPONENT).eq(index);
export const gridPod = (index) =>
  cy.get(CY_ROOT).find("div").find(`div:nth-child(${index})`);
export const gridComponent = () => cy.get(GRID_COMPONENT);
