import { userItemApi, itemApi } from "@/service";
import React, { useEffect, useState, useContext } from "react";
import { accountApi } from "@/service";
import { AuthContext } from "@/context";
import path from "path-browserify";
const PersonalBag = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        // Gọi API để lấy danh sách các item của người dùng
        const userItemsResponse = await userItemApi.get({
          _id: user._id,
          type: 0,
        });
        console.log(
          ">>>CHECK personal bag of user has id:",
          user._id,
          ":",
          user
        );
        const userItems = userItemsResponse.data;
        console.log(">>>CHECK user item:", userItems);
        // Lấy thông tin chi tiết của từng item
        const itemsDetails = await Promise.all(
          userItems.map(async (userItem) => {
            const itemResponse = await itemApi.getById(userItem.item);
            console.log(">>>CHECK URL:", itemResponse.data.originlUrl);
            return {
              id: userItem._id,
              title: itemResponse.data.name,
              imageUrl: `http://localhost:8070/images/${path.basename(
                itemResponse.data.originlUrl
              )}`,
              description: itemResponse.data.description,
              date: new Date(userItem.createdAt).toLocaleDateString(),
            };
          })
        );

        setArtworks(itemsDetails);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [user]);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Bag</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
              <p className="text-gray-600 mb-4">{artwork.description}</p>
              <p className="text-sm text-gray-500">Ngày tạo: {artwork.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBag;
