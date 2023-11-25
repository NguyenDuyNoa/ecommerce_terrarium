/* eslint-disable react/prop-types */
import Header from "../../../components/Header";
import LeftSidebar from "./LeftSidebar";

function PageLayoutAdmin({ children }) {
  return (
    <div>
      <Header />
      <div className="w-full flex bg-gray-100 min-h-screen h-auto ">
        <LeftSidebar />
        <div className="w-[81%] mt-4">{children}</div>
      </div>
    </div>
  );
}

export default PageLayoutAdmin;
