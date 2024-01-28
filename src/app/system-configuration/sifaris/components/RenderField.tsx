"use client";
import React from "react";
import Image from "next/image";
import type { CreateSifarisForm, EditModalData, Field, Fields } from "../types";
import EmailField from "./InputFields/EmailField";
import NumberField from "./InputFields/NumberField";
import DateField from "./InputFields/DateField";
import TextField from "./InputFields/TextField";
import DeleteIcon from "@/../public/assets/logo/DeleteIcon.svg"
import EditIcon from "@/../public/assets/logo/EditIcon.svg"
import { useFieldArray, useFormContext } from "react-hook-form";



// renders input field
function renderField([name, fieldAttribute]: [string, Field]) {
  if (fieldAttribute.type === "text") {
    return (
      <TextField
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "number") {
    return (
      <NumberField
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "email") {
    return (
      <EmailField
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }

  if (fieldAttribute.type === "date") {
    return (
      <DateField
        fieldAttribute={fieldAttribute}
        name={name}
      />
    );
  }
  return <div>Unknown Type</div>;
}

const RenderField = ({
  inputRowIndex,
  groupIndex,
  openEditFieldModal
}: {
  inputRowIndex: number;
  groupIndex: number;
  openEditFieldModal: (editData: EditModalData) => void;
}) => {


  // form create form context accessor
  const sifarisForm = useFormContext<CreateSifarisForm>();

  // @ts-expect-error
  const inputFields = sifarisForm.watch(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields`, [])

  const { remove } = useFieldArray({
    control: sifarisForm.control,
    name: `inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields`
  });


  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${inputFields.length}, 1fr)`,
          gap: "1.5rem",
        }}
      >
        {

          Array.isArray(inputFields)
            ? inputFields
              .map((field) => {
                return [field.name, field] as [string, Field];
              }).map(([name, fieldAttribute], fieldIndex) => {
                return (
                  <div
                    key={fieldAttribute.id}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1">
                      {renderField([name, fieldAttribute])}
                    </div>
                    <div className="flex flex-col gap-1">

                      <span
                        className="p-1 border cursor-pointer"
                        onClick={() => {
                          openEditFieldModal({
                            inputFieldIndex: fieldIndex,
                            inputFieldEditData: fieldAttribute,
                          });
                        }}
                      >
                        <Image
                          src={EditIcon}
                          alt={"Edit Icon for editing field"}
                        />
                      </span>
                      <span
                        className="p-1 border cursor-pointer"
                        onClick={() => remove(fieldIndex)}
                      >
                        <Image
                          src={DeleteIcon}
                          alt={"Delete Icon for deleting field"}
                        />
                      </span>
                    </div>
                  </div>
                );
              })

            // .map(renderField)
            // this part is not required here but need for a library build 
            : Object.entries(inputFields).map(renderField)
        }

      </div>
    </>
  )
};

export default RenderField;
