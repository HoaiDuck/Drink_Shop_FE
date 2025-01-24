import React, { useEffect, useState } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { PoundCircleOutlined, RedEnvelopeOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { VisitedHome, VisitedRequest } from "@/components/Account";
import { useParams } from "react-router-dom";
import { accountApi } from "@/service";

const onChange = (key) => {
  console.log(key);
};

const VisitedWorkspace = () => {
  const { id } = useParams();
  const [artistInfor, setArtistInfor] = useState({
    username: "",
    bio: "",
  });
  useEffect(() => {
    const fetchAccountItems = async () => {
      try {
        const AccountResponse = await accountApi.getAccById(id);
        console.log(">>>>CHECK Account Response:", AccountResponse);
        if (AccountResponse) {
          setArtistInfor({
            username: AccountResponse.data.username,
            bio: AccountResponse.data.bio,
          });
        }
      } catch (error) {
        console.error("Lỗi khi load artist:", error);
      } // Thêm dấu ngoặc nhọn đóng khối lệnh của catch
    };

    fetchAccountItems();
  }, [id]);
  const items = [
    {
      key: "1",
      label: "Home",
      children: React.cloneElement(<VisitedHome />, { id }),
    },
    {
      key: "2",
      label: "Category",
      children: "Hello",
    },
    {
      key: "3",
      label: "Request",
      children: React.cloneElement(<VisitedRequest />, { id }),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Ảnh bìa */}
      <div className=" relative h-64 bg-gray-300 overflow-hidden z-10">
        <img
          src="https://mygraphicbucket.s3.us-east-2.amazonaws.com/BE_Graphic/Items_e_commerce/original/66067e43cc80fd382be235db_500-kitten-http-api-error-1737393852418.png"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="z-20 relative  bg-white flex flex-col items-center sm:flex-row sm:items-start max-w-7xl mx-auto border rounded-lg shadow-lg ">
        {/* Avatar */}
        <div className="-mt-10 bg-white rounded-full">
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            icon={<AntDesignOutlined />}
          />
        </div>

        {/* Thông tin và nút Follow */}
        <div className="flex-row mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left w-full">
          <div className="flex items-center w-full flex-grow">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {artistInfor.username}
              </h1>
              <p className="text-sm text-gray-500">@nguyenvana</p>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">1,234 Followers</span>
                <span className="text-gray-600">567 Following</span>
              </div>
            </div>

            {/* Nút Follow */}
            <div className="ml-auto">
              <button className="m-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                Follow
              </button>
            </div>
          </div>

          <p className="mt-2 text-gray-600">{artistInfor.bio}</p>

          {/* Level và thông tin khác */}
        </div>
      </div>
      {/* Phần thông tin cá nhân */}

      {/* Các phần khác (ví dụ: bài viết, thông tin thêm) */}
      <div className="p-4 m-10 flex flex-col  items-center  my-2 z-20 relative  bg-white flex flex-col items-center sm:flex-row sm:items-start max-w-7xl mx-auto border rounded-lg shadow-lg ">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};
export default VisitedWorkspace;
