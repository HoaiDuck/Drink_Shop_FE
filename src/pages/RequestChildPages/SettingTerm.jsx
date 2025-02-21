import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { Selected } from "@/components/Product";
import { Link } from "react-router-dom";
import { itemApi, categoryApi, accountApi } from "@/service";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const marks = {
  1: "1 Day",
  50: "50 Days",
  100: "100 Days",
};
const SettingTerm = () => {
  const [categoryData, setCategoryData] = useState();
  const [selectCategory, setSelectCategory] = useState();
  // const [componentDisabled, setComponentDisabled] = useState(true);
  const listCategory = async () => {
    const res = await categoryApi.getAll();
    const listCate = res.data.map((item) => ({
      Name: item.Name,
      _id: item._id,
    }));
    setCategoryData(listCate);
    console.log(">>>>CHECK CATEGORY:", res.data);
  };
  const handleChangeCategory = (selected) => {
    console.log(`selected (At pages) ${typeof selected}`);
    setSelectCategory(selected);
  };
  useEffect(() => {
    listCategory();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
      {/* Phần bên trái */}
      <div className="bg-white rounded-md flex flex-col p-8 w-[50%] min-h-[500px] shadow-lg">
        <h1 className="text-xl font-bold mb-4">Setting Term Plan</h1>
        <div className="flex-1">
          {/* <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox> */}
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            // disabled={componentDisabled}
            style={{
              maxWidth: 600,
            }}
          >
            {/* <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
              <Checkbox>Checkbox</Checkbox>
            </Form.Item> */}
            {/* <Form.Item label="Radio">
              <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item
              name="Term Title"
              label="Term Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="Categories" label="Categories">
              <Selected
                data={categoryData}
                setSelect={handleChangeCategory}
              ></Selected>
            </Form.Item>

            <Form.Item
              name="Target Price"
              label="Target Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={100000} />
            </Form.Item>
            <Form.Item
              name="Description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea
                placeholder="Consider what content would make you happiest to create, like themes you enjoy and such. Including a bit of detail will make your fans more confident in what they can request from you!"
                rows={8}
              />
            </Form.Item>
            <Form.Item name="Time Range" label="Time Range">
              <Slider marks={marks} defaultValue={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>

      {/* Phần bên phải */}
      <div className="bg-white rounded-md flex flex-col p-6 w-[30%] min-h-[500px] shadow-lg ml-6">
        <h4 className="text-lg font-bold mb-2">
          How do I set my request terms?
        </h4>
        <p className="text-gray-700">
          Request terms are the conditions under which you are opening your
          requests. Fans submit their requests based on these terms.
        </p>
        <h4 className="mt-4 font-semibold">Have to</h4>
        <ul className="list-disc list-inside text-gray-700">
          <li>Choose the type of work you want to create.</li>
          <li>Add your Term details.</li>
          <li>Set a target price.</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingTerm;
