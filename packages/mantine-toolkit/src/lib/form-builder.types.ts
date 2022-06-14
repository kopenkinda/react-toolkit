import type {
  UseFormErrors,
  ValidationRule,
} from '@mantine/hooks/lib/use-form/use-form';

import {
  AutocompleteProps,
  ButtonProps,
  CheckboxProps,
  ChipsProps,
  InputBaseProps,
  PasswordInputProps,
  SelectItem,
  SelectProps,
} from '@mantine/core';

import { DatePickerProps } from '@mantine/dates';

interface UseFormInput<T> {
  validationRules?: ValidationRule<T>;
  errorMessages?: UseFormErrors<T>;
  initialValues: T;
}

type InputDefinition<T> = {
  formField: keyof T;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  required?: boolean;
  placeholder?: string;
  label: string;
};

type TextInputDefinition<T> = InputDefinition<T> & {
  type: 'text';
  props?: InputBaseProps;
};

type PasswordInputDefinition<T> = InputDefinition<T> & {
  type: 'password';
  props?: PasswordInputProps;
};

type AutocompleteInputDefinition<T> = InputDefinition<T> & {
  type: 'autocomplete';
  data: string[];
  props?: AutocompleteProps;
};

type DatePickerInputDefinition<T> = InputDefinition<T> & {
  type: 'datepicker';
  props?: DatePickerProps;
};

type SelectInputDefinition<T> = InputDefinition<T> & {
  type: 'select';
  data: SelectItem[];
  props?: SelectProps;
};

type CheckboxDefinition<T> = InputDefinition<T> & {
  type: 'checkbox';
  props?: CheckboxProps;
};

type ChipsDefinition<T> = Omit<
  InputDefinition<T> & {
    type: 'chips';
    data: string[];
    props?: ChipsProps;
    multiple?: boolean;
  },
  'label' | 'required' | 'placeholder'
>;

export type FormBuilderInput<T> =
  | TextInputDefinition<T>
  | PasswordInputDefinition<T>
  | DatePickerInputDefinition<T>
  | SelectInputDefinition<T>
  | AutocompleteInputDefinition<T>
  | CheckboxDefinition<T>
  | ChipsDefinition<T>;

export interface FormBuilderProps<T> {
  form: UseFormInput<T>;
  inputs: FormBuilderInput<T>[];
  handleSubmit(values: T): void;
  buttonProps?: ButtonProps<'button'>;
  loading?: boolean;
}
