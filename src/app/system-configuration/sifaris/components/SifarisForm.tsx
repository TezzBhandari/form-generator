"use client";

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { CreateSifarisForm } from "../types";
import InputRowC from "./InputRow";

const SifarisForm = () => {

  const sifarisFormCreator = useForm<CreateSifarisForm>({
    defaultValues: {
      formName: "Form Name",
      inputGroups: [
        {
          groupName: "Group Name",
          inputRows: [
            {
              inputfields: [],
            },
          ],
        },
      ],
    },
  });

  // for dynamic field
  // dynamic group
  const groupField = useFieldArray({
    control: sifarisFormCreator.control,
    name: "inputGroups",
  });

  return (
    <FormProvider {...sifarisFormCreator}>
      <form
        onSubmit={sifarisFormCreator.handleSubmit((data) => {
          alert(JSON.stringify(data))
          const filteredData = { formName: data.formName, inputGroups: data.inputGroups }
          alert(JSON.stringify(filteredData))
        }
        )}
      >
        {/* INPUT FORM NAME SECTION  */}
        <div className="form-name-input-container flex items-center justify-between">
          <input
            className="font-bold max-w-lg border-none bg-transparent placeholder:text-xl text-2xl placeholder:font-normal outline-none focus:border-none focus:outline-none "
            {...sifarisFormCreator.register("formName", { required: true })}
            placeholder="Enter a form name"
          />
          {/* <div className="settings cursor-pointer">
            <IoSettingsOutline className="w-6 h-6" />
          </div> */}
        </div>

        {/* GROUP CONTAINER  */}
        <div className="border border-red-400 rounded-xl flex flex-col gap-2 px-3 py-4">
          {groupField.fields.map((group, groupIndex) => {
            return (
              // INDIVIDUAL GROUP
              <div
                key={group.id}
                className="border relative border-green-400 p-5 rounded-lg"
              >
                <input
                  className="font-bold max-w-lg border-b border-black bg-transparent placeholder:text-xl text-3xl outline-none focus:border-none focus:outline-none "
                  {...sifarisFormCreator.register(
                    `inputGroups.${groupIndex}.groupName` as const,
                    { required: false }
                  )}
                  placeholder="Enter a group name"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    groupField.remove(groupIndex);
                  }}
                  className="px-2 py-1 bg-[#eee] text-black font-semibold rounded-md absolute top-1 right-1"
                >
                  {"x"}
                </button>
                {/* row container  */}
                <InputRowC groupIndex={groupIndex} />
              </div>
            );
          })}

          {/* BUTTON TO ADD ANOTHER GROUP  */}
          <div className="mt-4">
            <button
              className="px-1 py-2 text-xl font-semibold rounded-lg border-2 border-blue-950"
              onClick={(e) => {
                e.preventDefault();
                groupField.append({
                  groupName: "group name",
                  inputRows: [],
                });
              }}
            >
              Add another Row
            </button>
          </div>
        </div>
        {/* FORM SUBMISSION BUTTON  */}
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};

export default SifarisForm;
