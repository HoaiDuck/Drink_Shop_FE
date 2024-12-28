import React from "react";
import { Select, Space } from "antd";
import PropTypes from "prop-types";
// const options = [
//   {
//     label: "China",
//     value: "china",
//     emoji: "🇨🇳",
//     desc: "China (中国)",
//   },
//   {
//     label: "USA",
//     value: "usa",
//     emoji: "🇺🇸",
//     desc: "USA (美国)",
//   },
//   {
//     label: "Japan",
//     value: "japan",
//     emoji: "🇯🇵",
//     desc: "Japan (日本)",
//   },
//   {
//     label: "Korea",
//     value: "korea",
//     emoji: "🇰🇷",
//     desc: "Korea (韩国)",
//   },
// ];

const Selected = (props) => {
  const options = [];
  console.log("Check PROPS:", props);
  const listItems = props.data || [];
  if (listItems) {
    listItems?.forEach((element) => {
      options.push({
        label: element.Name,
        value: element._id,
        desc: element.Name,
      });
    });
  } else {
    console.error("listCate is not an array. Received:", listItems);
  }

  const handleChange = (selected) => {
    console.log(">>>CHECK SELECTED AT Child:", selected);
    props.setSelect(selected);
  };
  console.log(">>>CHECK OPTION LIST:", props.data);
  return (
    <Select
      className="leading-6"
      mode="multiple"
      style={{
        width: "100%",
      }}
      placeholder="Select category"
      //   defaultValue={["china"]}
      onChange={handleChange}
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}></span>
          {option.data.desc}
        </Space>
      )}
    />
  );
};
Selected.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setSelect: PropTypes.func.isRequired,
};
export default Selected;
// import React from "react";
// import { Select, Space } from "antd";
// import PropTypes from "prop-types";
// // const options = [
// //   {
// //     label: "China",
// //     value: "china",
// //     emoji: "🇨🇳",
// //     desc: "China (中国)",
// //   },
// //   {
// //     label: "USA",
// //     value: "usa",
// //     emoji: "🇺🇸",
// //     desc: "USA (美国)",
// //   },
// //   {
// //     label: "Japan",
// //     value: "japan",
// //     emoji: "🇯🇵",
// //     desc: "Japan (日本)",
// //   },
// //   {
// //     label: "Korea",
// //     value: "korea",
// //     emoji: "🇰🇷",
// //     desc: "Korea (韩国)",
// //   },
// // ];

// const SelectCategory = (value, { setSelectCategory }) => {
//   const options = [];
//   const listCate = value.dataCate;

//   listCate?.forEach((element) => {
//     options.push({ label: element, value: element, desc: element });
//   });

//   const handleChange = (selected) => {
//     setSelectCategory(selected);
//   };
//   console.log(">>>CHECK OPTION LIST:", value.dataCate);
//   return (
//     <Select
//       className="leading-6"
//       mode="multiple"
//       style={{
//         width: "100%",
//       }}
//       placeholder="Select category"
//       //   defaultValue={["china"]}
//       onChange={handleChange}
//       options={options}
//       optionRender={(option) => (
//         <Space>
//           <span role="img" aria-label={option.data.label}></span>
//           {option.data.desc}
//         </Space>
//       )}
//     />
//   );
// };

// export default SelectCategory;
