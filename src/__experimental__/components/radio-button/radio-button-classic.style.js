import { css } from 'styled-components';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import LabelStyle from '../label/label.style';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({
  disabled, fieldHelpInline, reverse, theme
}) => isClassic(theme) && css`
  ${StyledCheckableInput},
  ${HiddenCheckableInputStyle},
  ${StyledCheckableInputSvgWrapper},
  svg {
    height: 15px;
    width: 15px;
  }

  ${FieldHelpStyle} {
    margin-left: 22px;
  }

  ${FieldHelpStyle}, ${LabelStyle} {
    padding: 0 6px;
  }

  ${StyledCheckableInput} {
    margin-right: 6px;
  }

  ${HiddenCheckableInputStyle}:not([disabled]) {
    &:focus + ${StyledCheckableInputSvgWrapper} > svg {
      box-shadow: 0 0 6px rgba(25, 99, 246, 0.6);
      transition: box-shadow 0.1s linear;
    }
  }

  circle {
    r: 5;
  }

  svg {
    border-color: rgb(175, 175, 175);
  }

  ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
    fill: rgba(0, 0, 0, 0.85);
  }

  ${disabled && css`
    circle {
      fill: #e6ebed;
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: #8099a4;
    }
  `}

  ${(fieldHelpInline || reverse) && `
    ${FieldHelpStyle} {
      margin-left: 0;
      margin-right: 6px;
    }

    ${StyledCheckableInput} {
      margin-left: 6px;
    }
  `}
`;
