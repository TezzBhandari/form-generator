import RenderField from "./components/RenderField";
import SifarisForm from "./components/SifarisForm";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <SifarisForm />
      {/* <RenderField /> */}
    </div>
  );
};

export default page;
