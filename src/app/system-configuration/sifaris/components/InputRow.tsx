import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { CreateSifarisForm, InputRow } from "../types";
import RenderField from "./RenderField";

const InputRowC = ({ groupIndex }: { groupIndex: number }) => {
  const form = useFormContext<CreateSifarisForm>();

  const inputRowsField = useFieldArray({
    control: form.control,
    name: `inputGroups.${groupIndex}.inputRows`,
  });

  console.log("inputrows: ", inputRowsField.fields);

  return (
    <div className="border border-blue-400 p-3 rounded-md my-2">
      {inputRowsField.fields.map((inputRow, inputRowIndex) => {
        return (
          <div
            key={inputRow.id}
            className="relative border p-6 m-3 rounded-md "
          >
            <RenderField />
            <button
              className="px-2 py-1 border rounded-md"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              add field
            </button>
            <span
              className="absolute right-2 top-1 cursor-pointer px-2 py-1 bg-[#eee] rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                inputRowsField.remove(inputRowIndex);
              }}
            >
              x
            </span>
          </div>
        );
      })}
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            inputRowsField.append({
              inputfields: [],
            });
          }}
        >
          add another row
        </button>
      </div>
    </div>
  );
};

export default InputRowC;
