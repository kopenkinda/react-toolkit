import { lazy, Suspense } from 'react';

import { useForm } from '@mantine/hooks';
import type { UseForm } from '@mantine/hooks/lib/use-form/use-form';

import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Chips,
  Grid,
  LoadingOverlay,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';

import { FormBuilderInput, FormBuilderProps } from './form-builder.types';
const DatePicker = lazy(() =>
  import('@mantine/dates').then((m) => ({ default: m.DatePicker }))
);

export default function FormBuilder<DataShape>({
  form: _form,
  inputs,
  buttonProps,
  handleSubmit,
  loading,
}: FormBuilderProps<DataShape>) {
  const form = useForm<DataShape>(_form);
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ position: 'relative' }}
    >
      <LoadingOverlay visible={loading ?? false} />
      <Grid gutter="lg">
        {inputs.map((input) => (
          <Grid.Col key={String(input.formField)} span={input.col ?? 12}>
            <Input input={input} form={form} />
          </Grid.Col>
        ))}
        <Grid.Col span={12}>
          <Button type="submit" {...buttonProps}></Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

function Input<T>({
  input,
  form,
}: {
  input: FormBuilderInput<T>;
  form: UseForm<T>;
}) {
  switch (input.type) {
    case 'text':
      return (
        <TextInput
          {...form.getInputProps(input.formField)}
          {...(input.props ?? {})}
          placeholder={input.placeholder ?? ''}
          label={input.label}
          required={input.required ?? false}
        />
      );
    case 'password':
      return (
        <PasswordInput
          {...form.getInputProps(input.formField)}
          {...(input.props ?? {})}
          placeholder={input.placeholder ?? ''}
          label={input.label}
          required={input.required ?? false}
        />
      );
    case 'datepicker':
      return (
        <Suspense fallback={<LoadingOverlay visible />}>
          <DatePicker
            {...form.getInputProps(input.formField)}
            {...(input.props ?? {})}
            placeholder={input.placeholder ?? ''}
            label={input.label}
            required={input.required ?? false}
          />
        </Suspense>
      );
    case 'autocomplete':
      return (
        <Autocomplete
          {...form.getInputProps(input.formField)}
          {...(input.props ?? {})}
          placeholder={input.placeholder ?? ''}
          label={input.label}
          required={input.required ?? false}
          data={input.data}
        />
      );
    case 'select':
      return (
        <Select
          {...form.getInputProps(input.formField)}
          {...(input.props ?? {})}
          placeholder={input.placeholder ?? ''}
          label={input.label}
          required={input.required ?? false}
          data={input.data}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          {...form.getInputProps(input.formField)}
          {...(input.props ?? {})}
          placeholder={input.placeholder ?? ''}
          label={input.label}
          required={input.required ?? false}
        />
      );
    case 'chips':
      return (
        <Chips
          {...form.getInputProps(input.formField)}
          {...(input.props ?? {})}
          multiple={input.multiple ?? false}
        >
          {input.data.map((item) => (
            <Chip value={item} key={item}>
              {item}
            </Chip>
          ))}
        </Chips>
      );
  }
}
