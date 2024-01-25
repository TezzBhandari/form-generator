"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSifarisForm, Field } from "../types";
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

// renders input field
function renderField([name, fieldAttribute]: [string, Field]) {
  if (fieldAttribute.type === "text") {
    return (
      <TextField
        key={fieldAttribute.id}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "number") {
    return (
      <NumberField
        key={fieldAttribute.id}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "email") {
    return (
      <EmailField
        key={fieldAttribute.id}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "date") {
    return (
      <DateField
        key={fieldAttribute.id}
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }
  return <div>Unknown Type</div>;
}

const RenderField = () => {
  // const form = useForm<CreateSifarisForm>();
  return (
    <>
      {/* <FormProvider {...form}> */}
      <div>
        {data.map((inputGroup, inputGroupIndex) => {
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
        })}
      </div>
      {/* </FormProvider> */}
    </>
  );
};

export default RenderField;
