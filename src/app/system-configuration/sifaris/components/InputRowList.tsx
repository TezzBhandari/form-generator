import React, { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { CreateSifarisForm } from "../types";
import InputRow from "./InputRow"

const InputRowList = ({ groupIndex }: { groupIndex: number }) => {

  const sifarisForm = useFormContext<CreateSifarisForm>();

  const inputRowsField = useFieldArray({
    control: sifarisForm.control,
    name: `inputGroups.${groupIndex}.inputRows`,
  });




  return (
    <div className="border border-blue-400 p-3 rounded-md my-2">
      {inputRowsField.fields.map((inputRow, inputRowIndex) => {
        return (
          <div className="each-input-row-container border   border-purple-400 rounded-md p-10 relative" key={inputRow.id}>
            {
              inputRowIndex <= 0 ? null : <button className="px-2 py-1 bg-[#eee] text-black font-semibold rounded-md absolute top-1 right-10" onClick={(e) => {
                e.preventDefault();
                inputRowsField.swap(inputRowIndex, inputRowIndex - 1)
              }}>up</button>
            }
            <button onClick={(e) => {
              e.preventDefault();
              inputRowsField.remove(inputRowIndex)
            }} className="px-2 py-1 bg-[#eee] text-black font-semibold rounded-md text-sm absolute top-1 right-1">X</button>
            <InputRow inputRowIndex={inputRowIndex} groupIndex={groupIndex} />
          </div>
        )
        // return (
        //   <div
        //     key={inputRow.id}
        //     className="relative border p-6 m-3 rounded-md "
        //   >
        //     <RenderField inputRowIndex={inputRowIndex} groupIndex={groupIndex} />
        //     <button
        //       className="px-2 py-1 border rounded-md"
        //       onClick={(e) => {
        //         e.preventDefault();
        //         openFieldForm()
        //       }}
        //     >
        //       add field
        //     </button>
        //     <span
        //       className="absolute right-2 top-1 cursor-pointer px-2 py-1 bg-[#eee] rounded-lg"
        //       onClick={(e) => {
        //         e.preventDefault();
        //         inputRowsField.remove(inputRowIndex);
        //       }}
        //     >
        //       x
        //     </span>
        //     {/* // MODAL FORM */}
        //     <InputFieldFormModal

        //       isOpen={isFieldFormOpen}
        //       onClose={closeFieldForm}
        //       groupIndex={groupIndex}
        //       inputRowIndex={inputRowIndex}
        //     />
        //   </div>
        // );
      })}
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();

            //TODO: GENERATE UNIQUE ID FOR EACH ROW
            inputRowsField.append({
              inputfields: [],
            });
          }}
        >
          add another row
        </button>
      </div>
    </div >
  );
};

export default InputRowList;
