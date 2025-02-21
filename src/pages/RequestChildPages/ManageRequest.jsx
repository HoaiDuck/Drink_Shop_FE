import React from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import {
  ReceivedRequest,
  SentRequest,
} from "@/components/RequestNormal/ManageRequest";
import { Link } from "react-router-dom";
const ManageRequest = () => {
  const components = [ReceivedRequest, SentRequest];
  return (
    <div className="flex">
      <div className="bg-white rounded-md flex-col  m-3 w-[912px] h-[912px] p-8">
        <h1 className="text-xl font-bold leading-7 -mt-1 mr-0 mb-0 ml-0">
          Manage Request
        </h1>
        <div>
          <Tabs
            className="w-full"
            defaultActiveKey="1"
            items={[AndroidOutlined, AppleOutlined].map((Icon, id) => {
              const tableName = ["Received Requests", "Sent Requests"];
              const Component = components[id];
              return {
                key: id,
                label: tableName[id],
                children: <Component />,

                icon: <Icon />,
              };
            })}
          />
        </div>
      </div>
      <div className="bg-white rounded-md flex m-3 p-6">
        <h1 className="text-xl font-bold leading-7 -mt-1 mr-0 mb-0 ml-0">
          Request Term
          <Link to="/Request/SettingTerm">
            {" "}
            <Button>Create Term</Button>
          </Link>
        </h1>
      </div>
    </div>
  );
};
export default ManageRequest;
