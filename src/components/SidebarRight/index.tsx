// SidebarRight.tsx

import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import { colorServices, sizeServices } from "../../services";
import "./style.css";

interface DataTypeColor {
  id: any;
  color_name: string;
  code: string;
}

interface DataTypeSize {
  id: any;
  name: string;
}

const SidebarRight: React.FC = () => {
  const [colors, setColors] = useState<DataTypeColor[]>([]);
  const [sizes, setSizes] = useState<DataTypeSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<DataTypeColor[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<DataTypeSize[]>([]);
  const [price, setPrice] = useState<number | number[]>();

  const getColors = async () => {
    try {
      const res: any = await colorServices.getColor();
      setColors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSizes = async () => {
    try {
      const res: any = await sizeServices.getSize();
      setSizes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleColorChange = (colorId: number) => {
    setSelectedColors((prevSelectedColors: any) => {
      if (prevSelectedColors.includes(colorId)) {
        return prevSelectedColors.filter((id: number) => id !== colorId);
      } else {
        return [...prevSelectedColors, colorId];
      }
    });
  };

  const handleSizeChange = (sizeId: number) => {
    setSelectedSizes((prevSelectedSizes: any) => {
      if (prevSelectedSizes.includes(sizeId)) {
        return prevSelectedSizes.filter((id: number) => id !== sizeId);
      } else {
        return [...prevSelectedSizes, sizeId];
      }
    });
  };

  const handleChangePrice = (value: number | number[]) => {
    setPrice(value);
  };

  const handleFilterClick = () => {
    const selectedColorInfo = colors
      .filter((color: any) => selectedColors.includes(color.id))
      .map((color) => ({ id: color.id, name: color.color_name }));

    const selectedSizeInfo = sizes
      .filter((size: any) => selectedSizes.includes(size.id))
      .map((size) => ({ id: size.id, name: size.name }));

    const searchData = {
      colors: selectedColorInfo,
      sizes: selectedSizeInfo,
      price: price,
    };

    // Gọi API tìm kiếm với searchData
  };

  useEffect(() => {
    getColors();
    getSizes();
  }, []);

  return (
    <div className="lg:flex lg:flex-col lg:items-center lg:justify-between p-4">
      <div className="mb-4 lg:w-64">
        <h3 className="text-lg font-semibold mb-2">Color Filter</h3>
        <div className="grid grid-cols-8 gap-4">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer`}
              style={{ backgroundColor: `${color.code}` }}
              title={color.color_name}
              onClick={() => handleColorChange(color.id)}
            >
              {selectedColors.includes(color.id) && (
                <span className="text-white font-bold text-xl">V</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 lg:w-64">
        <h3 className="text-lg font-semibold mb-2">Size Filter</h3>
        <div className="flex">
          {sizes &&
            sizes.map((size, index) => (
              <div
                key={index}
                className={`cursor-pointer mr-2 p-2 border rounded ${
                  selectedSizes.includes(size.id)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleSizeChange(size.id)}
              >
                {size.name}
              </div>
            ))}
        </div>
      </div>
      <div className="mb-4 lg:w-64">
        <Slider
          range
          min={0}
          max={10000000}
          step={10000}
          defaultValue={[50000, 10000000]}
          onChange={handleChangePrice}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={handleFilterClick}
      >
        Filter
      </button>
    </div>
  );
};

export default SidebarRight;
