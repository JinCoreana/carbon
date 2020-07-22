import * as React from 'react';
import Option from '../option';

export interface FilterableSelectProps {
  /** Id attribute of the input element */
  id?: string;
  /** Name attribute of the input element */
  name?: string;
  /** If true the Component will be read-only */
  readOnly?: boolean;
  /** If true the Component will be disabled? */
  disabled?: boolean;
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** Label */
  label?: string;
  /** Text applied to label help tooltip */
  labelHelp?: string;
  /** When true, label is placed in line with an input */
  labelInline?: boolean;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /** Size of an input */
  size?: 'small' | 'medium' | 'large';
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string | object;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string | object;
  /** Child components (such as Option) for the SelectList */
  children: Array<typeof Option>;
  /** If true, prevents opening the menu on focus */
  preventFocusAutoOpen?: boolean;
  /** If true the component input has no border and is transparent */
  transparent?: boolean;
  /** If true the Component has filter functionality (filtering starts when two or more characters are typed) */
  filterable?: boolean;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** A custom callback for when changes occur */
  onChange?: () => void;
  /** Callback function for when the Select Textbox is clicked. */
  onClick?: () => void;
  /** Callback function for when the Select Textbox is focused. */
  onFocus?: () => void;
  /** Callback function for when the Select Textbox loses it's focus. */
  onBlur?: () => void;
}

declare const FilterableSelect: React.ComponentType<FilterableSelectProps>;

export default FilterableSelect;
