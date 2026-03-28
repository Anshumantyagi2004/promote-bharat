"use client";
import ReviewSection from "@/components/Supplier/Product/ReviewSection";
import axios from "axios";
import {
  Tag,
  Layers,
  Boxes,
  BadgeIndianRupee,
  Truck,
  CreditCard,
  PackageOpen,
  Factory,
  Info,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProductPage({ slug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${slug}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [slug]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  const images = product?.images || ["/no-image.png", "/no-image.png", "/no-image.png"];

  return (
    <div className="p-6 w-full bg-gray-100 space-y-6">
      <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-6">
        <div>
          <div className="bg-gray-100 h-80 rounded flex items-center justify-center mb-3 border border-gray-200">
            <img
              src={images[activeImg]}
              className="h-full object-contain"
              alt=""
            />
          </div>

          <div className="flex gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${activeImg === i ? "border-blue-500" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h1 className="text-2xl font-bold text-black">
            {product.name}
          </h1>

          <p className="text-xl text-[#0a5183] font-semibold flex items-center gap-2">
            <BadgeIndianRupee size={20} />
            {product.price || "Add Price"}/Piece
          </p>
          {/* INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <Tag className="text-[#0a5183]" size={18} />
              <span className="font-medium">Category:</span>
              <span>{product?.categoryId?.name || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <Layers className="text-[#0a5183]" size={18} />
              <span className="font-medium">Sub Category:</span>
              <span>{product?.subCategoryId?.name || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <Boxes className="text-[#0a5183]" size={18} />
              <span className="font-medium">MOQ:</span>
              <span>{product?.minOrderQty || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <BadgeIndianRupee className="text-[#0a5183]" size={18} />
              <span className="font-medium">Price Type:</span>
              <span>{product?.priceType || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <Truck className="text-[#0a5183]" size={18} />
              <span className="font-medium">Delivery:</span>
              <span>{product?.deliveryTime || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <CreditCard className="text-[#0a5183]" size={18} />
              <span className="font-medium">Payment:</span>
              <span>{product?.paymentTerms || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <PackageOpen className="text-[#0a5183]" size={18} />
              <span className="font-medium">Packaging:</span>
              <span>{product?.packagingDetails || "-"}</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
              <Factory className="text-[#0a5183]" size={18} />
              <span className="font-medium">Supply:</span>
              <span>{product?.supplyAbility || "-"}</span>
            </div>

            <div className="flex sm:cols-span-2 items-start gap-2 p-2 rounded-md hover:bg-gray-50 col-span-1 sm:col-span-2">
              <Info className="text-[#0a5183] mt-1" size={18} />
              <div>
                <p>
                  <span className="font-medium">Meta Title:</span>{" "}
                  {product?.metaTitle || "-"}
                </p>
                <p>
                  <span className="font-medium">Meta Description:</span>{" "}
                  {product?.metaDescription || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-black">Description</h2>
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: product.description || "No description",
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-black text-center">Specifications</h2>

          {product.specifications?.length > 0 ? (
            <div className="space-y-2">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-b-gray-300 pb-1">
                  <span className="text-gray-900 font-bold">● {spec.key}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              No specifications added
            </p>
          )}
        </div>
      </div>

      <ReviewSection />
    </div>
  );
}