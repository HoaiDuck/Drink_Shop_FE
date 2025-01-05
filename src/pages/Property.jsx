import React from "react";
import { PoundCircleOutlined, RedEnvelopeOutlined } from "@ant-design/icons";
import { Tabs, Table } from "antd";
import { BillTable, IncomeTable } from "@/components/Propertys";
const Property = () => {
  const components = [BillTable, IncomeTable];
  return (
    <div className="p-4 m-10 flex flex-col  items-center justify-center border-2 border-white-500">
      <Tabs
        className="w-full"
        defaultActiveKey="1"
        items={[PoundCircleOutlined, RedEnvelopeOutlined].map((Icon, id) => {
          const tableName = ["Bill", "Income"];
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
  );
};
export default Property;
