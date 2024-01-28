import React, { useState } from 'react'
import InputFieldFormModal from "./InputFieldFormModal";
import RenderField from "./RenderField";
import type { Field, EditModalData } from '../types';


interface InputRowProps {
    inputRowIndex: number;
    groupIndex: number;
    // inputRow: FieldArrayWithId<CreateSifarisForm, `inputGroups.${number}.inputRows`, "id">
}

const InputRow = ({ groupIndex, inputRowIndex }: InputRowProps) => {

    const [isFieldFormOpen, setIsFieldFormOpen] = useState(false);
    const [editData, setEditData] = useState<EditModalData | null>(null);


    // reset editformdata
    const resetEditData = () => {
        setEditData(null);
    };

    const openFieldForm = () => {
        setIsFieldFormOpen(true);
    };

    const closeFieldForm = () => {
        setIsFieldFormOpen(false);
        resetEditData();
    };

    // const sifarisForm = useFormContext<CreateSifarisForm>();

    // // @ts-expect-error
    // const inputFields = sifarisForm.watch(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields`, [])



    // for using same model as edit form
    const openEditFieldModal = (editData: EditModalData) => {
        setEditData(editData);
        openFieldForm();
    };



    return (
        <>
            <div>
                <RenderField openEditFieldModal={openEditFieldModal} inputRowIndex={inputRowIndex} groupIndex={groupIndex} />
                <button
                    className="px-2 py-1 border rounded-md"
                    onClick={(e) => {
                        e.preventDefault();
                        openFieldForm()
                    }}
                >
                    add field
                </button>

                {/* // MODAL FORM */}
                <InputFieldFormModal
                    editModalData={editData}
                    isOpen={isFieldFormOpen}
                    onClose={closeFieldForm}
                    groupIndex={groupIndex}
                    inputRowIndex={inputRowIndex}
                />
            </div>
        </>
    )
}

export default InputRow