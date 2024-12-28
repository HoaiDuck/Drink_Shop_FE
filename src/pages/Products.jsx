import React, { useEffect, useState } from "react";
import { itemApi, categoryApi, accountApi } from "@/service"; // Đường dẫn này điều chỉnh theo cấu trúc thư mục của bạn.

import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Selected } from "@/components/Product";

const Products = () => {
  const [categoryData, setCategoryData] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [artistData, setArtistData] = useState();
  const [selectArtist, setSelectArtist] = useState();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    artist: "",
    category: "",
    price: "",
    url: null, // Thêm trường lưu ảnh
  });
  const listCategory = async () => {
    const res = await categoryApi.getAll();
    const listCate = res.data.map((item) => ({
      Name: item.Name,
      _id: item._id,
    }));
    setCategoryData(listCate);
    console.log(">>>>CHECK CATEGORY:", res.data);
  };
  const listArtist = async () => {
    const res = await accountApi.getByRole(2);
    const listCate = res.data.map((item) => ({
      Name: item.username,
      _id: item._id,
    }));
    setArtistData(listCate);
    console.log(">>>>CHECK Artist:", listCate);
  };
  useEffect(() => {
    listCategory();
    listArtist();
  }, []);
  useEffect(() => {
    console.log(">>>>CHECK CateData:", categoryData);
  }, [categoryData]);
  const handleChangeCategory = (selected) => {
    console.log(`selected (At pages) ${selected}`);
    setSelectCategory(selected);
  };
  const handleChangeArtist = (selected) => {
    console.log(`selected Artist (At pages) ${selected}`);
    setSelectArtist(selected);
  };
  const [loading, setLoading] = useState(false); // Trạng thái gửi dữ liệu

  //antt upload function
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xác thực dữ liệu
  const validateForm = () => {
    const { name, description, artist, category, price } = formData;
    if (!name || !description || !artist || !category || !price) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return false;
    }
    return true;
  };

  // Gửi dữ liệu
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await itemApi.add(formData);
      console.log("Thêm sản phẩm thành công:", response.data);
      alert("Thêm sản phẩm thành công!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        artist: "",
        category: "",
        price: "",
        productCode: "",
        url: null,
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Thêm sản phẩm thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-1/3 flex flex-col items-center border p-4">
        <ImgCrop rotationSlider>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
      <div className="w-2/3 px-8">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Add title"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Description</label>
          <textarea
            name="description"
            placeholder="Add description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Artist</label>
          <Selected data={artistData} setSelect={handleChangeArtist}></Selected>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Category</label>
          <Selected
            data={categoryData}
            setSelect={handleChangeCategory}
          ></Selected>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Add price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gray-300 px-6 py-2 rounded-md font-bold"
          disabled={loading} // Vô hiệu hóa khi đang tải
        >
          {loading ? "Processing..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Products;
