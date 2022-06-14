import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FormBuilder from './form-builder';

export default {
  component: FormBuilder,
  title: 'FormBuilder',
  argTypes: {
    loading: { defaultValue: false, type: 'boolean' },
  },
} as ComponentMeta<typeof FormBuilder>;

const saveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const AllFields: ComponentStory<typeof FormBuilder> = ({
  loading = false,
}) => (
  <FormBuilder
    form={{
      initialValues: {
        textInput: '',
        date: new Date(),
      },
    }}
    loading={loading}
    inputs={[
      {
        formField: 'textInput',
        type: 'text',
        label: 'Message',
      },
      {
        formField: 'date',
        type: 'datepicker',
        label: 'Date',
      },
    ]}
    buttonProps={{
      children: 'Submit',
      leftIcon: saveIcon,
    }}
    handleSubmit={action('submit')}
  />
);
