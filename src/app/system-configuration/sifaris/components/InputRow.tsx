import React, { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { CreateSifarisForm, InputRow } from "../types";
import RenderField from "./RenderField";
import Row from "./Row"

const InputRowC = ({ groupIndex }: { groupIndex: number }) => {
  const [isFieldFormOpen, setIsFieldFormOpen] = useState(false);


  const openFieldForm = () => {
    setIsFieldFormOpen(true);
  };

  const closeFieldForm = () => {
    setIsFieldFormOpen(false);
  };

  const sifarisForm = useFormContext<CreateSifarisForm>();

  const inputRowsField = useFieldArray({
    control: sifarisForm.control,
    name: `inputGroups.${groupIndex}.inputRows`,
  });



  // console.log("inputrows: ", inputRowsField.fields);

  return (
    <div className="border border-blue-400 p-3 rounded-md my-2">
      {inputRowsField.fields.map((inputRow, inputRowIndex) => {
        // console.log('inputRow  : : ', typeof inputRow)
        // return <></>
        return <Row key={inputRowIndex} inputRowIndex={inputRowIndex} groupIndex={groupIndex} inputRow={inputRow} />
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
