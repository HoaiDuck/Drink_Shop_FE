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
    artist: [],
    category: [],
    price: "",
    imageName: "", // Thêm trường lưu tên ảnh
  });

  const [loading, setLoading] = useState(false); // Trạng thái gửi dữ liệu
  const [fileList, setFileList] = useState([]); // Danh sách file upload

  // Lấy danh sách category
  const listCategory = async () => {
    const res = await categoryApi.getAll();
    const listCate = res.data.map((item) => ({
      Name: item.Name,
      _id: item._id,
    }));
    setCategoryData(listCate);
    console.log(">>>>CHECK CATEGORY:", res.data);
  };

  // Lấy danh sách artist
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

  // Xử lý thay đổi category
  const handleChangeCategory = (selected) => {
    console.log(`selected (At pages) ${typeof selected}`);
    setSelectCategory(selected);
  };

  // Xử lý thay đổi artist
  const handleChangeArtist = (selected) => {
    console.log(`selected Artist (At pages) ${typeof selected}`);
    setSelectArtist(selected);
  };

  // Xử lý thay đổi file upload
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Lưu tên ảnh khi upload thành công
    if (newFileList.length > 0) {
      console.log(">>upload success!!");
      setFormData({ ...formData, imageName: newFileList[0].name });
    } else {
      console.log(">>upload failed!!", newFileList);
      setFormData({ ...formData, imageName: "" });
    }
  };

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xác thực dữ liệu
  const validateForm = () => {
    const { name, description, price } = formData;
    const artist = selectArtist;
    const category = selectCategory;

    if (
      !name ||
      !description ||
      !artist ||
      !category ||
      !price ||
      fileList.length === 0
    ) {
      console.log(">>CHECK data before post:", {
        name,
        description,
        artist,
        category,
        price,
        fileList,
      });
      alert("Vui lòng nhập đầy đủ thông tin và upload ảnh.");
      return false;
    }
    return true;
  };

  // Gửi dữ liệu
  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Tạo đối tượng FormData
    const formDataPost = new FormData();

    // Thêm các trường dữ liệu vào FormData
    formDataPost.append("name", formData.name);
    formDataPost.append("description", formData.description);
    formDataPost.append("artist", JSON.stringify(selectArtist));
    formDataPost.append("category", JSON.stringify(selectCategory));
    formDataPost.append("price", formData.price);

    // Thêm file vào FormData (nếu có)
    if (fileList.length > 0) {
      formDataPost.append("url", fileList[0].originFileObj); // Gửi đối tượng file
    }

    console.log(">>>>CHECK FORM DATA:", formDataPost);

    setLoading(true);
    try {
      // Gửi FormData lên backend
      const response = await itemApi.add(formDataPost);
      console.log("Thêm sản phẩm thành công:", response.data);
      alert("Thêm sản phẩm thành công!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        artist: [],
        category: [],
        price: "",
        imageName: "",
      });
      setFileList([]); // Reset danh sách file
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
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            beforeUpload={() => false} // Ngăn chặn tự động upload
          >
            {fileList.length < 1 && "+ Upload"}
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
