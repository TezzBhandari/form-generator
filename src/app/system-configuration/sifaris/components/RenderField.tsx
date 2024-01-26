"use client";
import React from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import type { CreateSifarisForm, Field, InputRow } from "../types";
import EmailField from "./InputFields/EmailField";
import NumberField from "./InputFields/NumberField";
import DateField from "./InputFields/DateField";
import TextField from "./InputFields/TextField";

const data: CreateSifarisForm["inputGroups"] = [
  {
    groupName: "group 1",
    inputRows: [
      {
        inputfields: [
          {
            id: "1",
            label: "email",
            type: "email",
            name: "email",
            required: true,
            placeholder: "doe@gmail.com",
          },
          {
            id: "2",
            label: "fullname",
            type: "text",
            name: "fullname",
            required: true,
            placeholder: "Ram Bahadur",
          },
        ],
      },
    ],
  },
];

const data2: Array<InputRow> = [
  {
    inputfields: [
      {
        id: "1",
        label: "email",
        type: "email",
        name: "email",
        required: true,
        placeholder: "doe@gmail.com",
      },
      {
        id: "2",
        label: "fullname",
        type: "text",
        name: "fullname",
        required: true,
        placeholder: "Ram Bahadur",
      },
    ],
  },
];

// renders input field
function renderField([name, fieldAttribute]: [string, Field], fieldIndex: number) {
  console.log('fieldIndex: ', fieldIndex)
  if (fieldAttribute.type === "text") {
    return (
      <TextField
        key={fieldIndex}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "number") {
    return (
      <NumberField
        key={fieldIndex}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "email") {
    return (
      <EmailField
        key={fieldIndex}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "date") {
    return (
      <DateField
        key={fieldIndex}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }
  return <div>Unknown Type</div>;
}

const RenderField = ({
  inputRowIndex,
  groupIndex
}: {
  inputRowIndex: number; groupIndex: number;
}) => {

  const sifarisForm = useFormContext<CreateSifarisForm>();

  const watchInputRows = useWatch({
    control: sifarisForm.control,
    name: `inputGroups.${groupIndex}.inputRows.${inputRowIndex}`, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: {

    // }, // default value before the render
  });

  console.log("watch:", watchInputRows);
  // const form = useForm<CreateSifarisForm>();
  return (
    <div>
      {/* <FormProvider {...form}> */}
      {/* {data.map((inputGroup, inputGroupIndex) => {
          return inputGroup.inputRows.map((inputRow, inputRowIndex) => {
            return (
              <div
                key={inputRowIndex}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${inputRow.inputfields.length}, 1fr)`,
                  gap: "1.5rem",
                }}
              >
                {Array.isArray(inputRow.inputfields)
                  ? inputRow.inputfields
                      .map((field) => {
                        return [field.name as string, field] as [string, Field];
                      })
                      .map(renderField)
                  : Object.entries(inputRow.inputfields).map(renderField)}
              </div>
            );
          });
        })} */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${watchInputRows.inputfields.length}, 1fr)`,
          gap: "1.5rem",
        }}
      >
        {

          Array.isArray(watchInputRows.inputfields)
            ? watchInputRows.inputfields
              .map((field) => {
                return [field.name as string, field] as [string, Field];
              })
              .map(renderField)
            : Object.entries(watchInputRows.inputfields).map(renderField)

        }

      </div>
    </div>
  )
};

export default RenderField;
