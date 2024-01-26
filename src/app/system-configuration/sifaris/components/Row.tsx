import React, { useState } from 'react'
import InputFieldFormModal from "./InputFieldFormModal";
import { useFieldArray, useFormContext, useWatch, FieldArrayWithId } from "react-hook-form";
import type { CreateSifarisForm, InputRow } from "../types";
import RenderField from "./RenderField";


interface RowProps {
    inputRowIndex: number;
    groupIndex: number;
    inputRow: FieldArrayWithId<CreateSifarisForm, `inputGroups.${number}.inputRows`, "id">
}

const Row = ({ groupIndex, inputRowIndex, inputRow }: RowProps) => {

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

    return (
        <>

            <div
                key={inputRow.id}
                className="relative border p-6 m-3 rounded-md "
            >
                <RenderField inputRowIndex={inputRowIndex} groupIndex={groupIndex} />
                <button
                    className="px-2 py-1 border rounded-md"
                    onClick={(e) => {
                        e.preventDefault();
                        openFieldForm()
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
                {/* // MODAL FORM */}
                <InputFieldFormModal

                    isOpen={isFieldFormOpen}
                    onClose={closeFieldForm}
                    groupIndex={groupIndex}
                    inputRowIndex={inputRowIndex}
                />
            </div>
        </>
    )
}

export default Row