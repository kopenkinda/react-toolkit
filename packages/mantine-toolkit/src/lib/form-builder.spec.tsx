import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import FormBuilder from './form-builder';
import { FormBuilderProps } from './form-builder.types';

describe('FormBuilder', () => {
  describe('Checkbox', () => {
    const CHECKBOX_FORM: FormBuilderProps<{ checked: boolean }> = {
      form: { initialValues: { checked: false } },
      handleSubmit: () => void 0,
      inputs: [
        {
          formField: 'checked',
          type: 'checkbox',
          label: 'CHECKBOX',
          placeholder: 'CHECKBOX',
          required: true,
          col: 12,
        },
      ],
    };

    let checkbox: HTMLInputElement;
    beforeEach(() => {
      render(<FormBuilder {...CHECKBOX_FORM} />);
      checkbox = screen.getByPlaceholderText('CHECKBOX');
    });

    test('Renders a checkbox', () => {
      expect(checkbox).toBeInTheDocument();
    });

    test('Unchecked on initial render', () => {
      expect(checkbox).not.toBeChecked();
    });

    test('Checked when clicked', () => {
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    test('Unhecked when clicked twice', () => {
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
  afterAll(cleanup);
});
