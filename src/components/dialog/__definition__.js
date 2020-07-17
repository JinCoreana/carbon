import Dialog from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('dialog', Dialog, {
  description: 'A dialog box overlaid on top of any page.',
  designerNotes: `
* Useful to perform an action in context without navigating the user to a separate page.
* Several pre-set widths are available - the height of the dialog will flex to fit the content. It’s best to avoid
 dialogs that are taller than the user’s viewport height. Typical user viewport heights can be as little as 650 pixels.
* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the dialog.
* A configuration shows a close icon at the top right of the Dialog. Sometimes users are more likely to click this than
 a traditional ‘Cancel’ button.
  `,
  relatedComponentsNotes: `
* Complex task that needs more space? [Try Dialog Full Screen](/components/dialog-full-screen).
* Need to refer back to the underlying page? [Try Sidebar](/components/sidebar).
 `,
  propOptions: {
    size: OptionsHelper.sizesFull
  },
  propValues: {
    title: 'Example Title for a Dialog',
    children: `<Form>
        <Textbox label="First Name" validations={[ new PresenceValidation() ]}/>
        <Textbox label="Middle Name" validations={[ new PresenceValidation() ]}/>
        <Textbox label="Surname" validations={[ new PresenceValidation() ]}/>
        <Textbox label="Birth Place" validations={[ new PresenceValidation() ]}/>
        <Textbox label="Favourite Colour" validations={[ new PresenceValidation() ]}/>
        <Textbox label="Address" validations={[ new PresenceValidation() ]}/>
        <DateInput name="date" label="Birthday" />
        <Dropdown name="foo" options={ Immutable.fromJS([{
          id: "1", name: "Orange"
        }, {
          id: "2", name: "Blue"
        }, {
          id: "3", name: "Green"
        }, {
          id: "4", name: "Black"
        }, {
          id: "5", name: "Yellow"
        }, {
          id: "6", name: "White"
        }, {
          id: "7", name: "Magenta"
        }, {
          id: "8", name: "Cyan"
        }, {
          id: "9", name: "Red"
        }, {
          id: "10", name: "Grey"
        }, {
          id: "11", name: "Purple"
        }]) } value="1" />
        <Textbox label="Pet Name" validations={[ new PresenceValidation() ]}/>
        <DateInput name="date" label="Pet's birthday" />
        <Checkbox name='checkbox' label='Do you like my Dog'/>
      </Form>
      This is an example of a dialog with a Form as content`
  },
  propTypes: {
    height: 'String',
    title: 'String',
    size: 'String',
    showCloseIcon: 'Boolean',
    subtitle: 'String',
    stickyFormFooter: 'Boolean',
    focusFirstElement: 'Function',
    disableFocusTrap: 'Boolean',
    disableAutoFocus: 'Boolean'
  },
  propDescriptions: {
    height: 'Sets a value for a specific height the dialog should take (for example "500px").',
    showCloseIcon: 'Set this prop to false to hide the close icon within the dialog.',
    size: `Change this prop to set the dialog to a specific size. Possible values include:
     ${OptionsHelper.sizesFull.join(', ')}`,
    subtitle: 'Controls the subtitle of the dialog.',
    title: 'Controls the main title of the dialog.',
    focusFirstElement: 'Function or reference to first element to focus',
    disableFocusTrap: 'Disables the focus trap when the dialog is open',
    disableAutoFocus: 'Disables auto focus functionality on child elements',
    bespokeFocusTrap: 'Function to replace focus trap'
  }
});

definition.isAModal();

export default definition;
