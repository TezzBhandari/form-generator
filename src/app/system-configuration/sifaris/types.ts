import { InputHTMLAttributes, Key } from "react";

interface FieldSchema {
  type: "text" | "date" | "email" | "number";
}

interface DefaultAttributes extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  required: boolean;
}

interface TextField extends FieldSchema, DefaultAttributes {
  type: "text";
}

interface EmailField extends FieldSchema, DefaultAttributes {
  type: "email";
}

interface DateField extends FieldSchema, DefaultAttributes {
  type: "date";
}

interface NumberField extends FieldSchema, DefaultAttributes {
  type: "number";
}

type Field = TextField | EmailField | DateField | NumberField;

type Fields = Record<string, Field>;

// used for input form modal: useForm<InputFormField>()
interface InputFormField {
  type: FieldSchema["type"];
  id: string;
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
}

// input row structure
interface InputRow {
  inputfields: Array<Field> | Fields;
}

// input group structure

interface InputGroup {
  groupName: string;
  inputRows: Array<InputRow>;
}

interface CreateSifarisForm {
  formName: string;
  inputGroups: Array<InputGroup>;
}

export type {
  FieldSchema,
  TextField,
  EmailField,
  DateField,
  NumberField,
  Field,
  InputFormField,
  InputRow,
  CreateSifarisForm,
};
