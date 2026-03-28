import { useState } from "react";
import { Edit, Plus, Trash2, ChevronDown } from "lucide-react";

export default function CategoryGrid({
  setForm,
  setAddModal,
  industries,
  handleEditIndustry,
  deleteIndustry,
  handleEditClick,
  handleDelete,
}) {
  const [expanded, setExpanded] = useState({});

  const toggleViewMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      {industries.map((item) => {
        const showAll = expanded[item._id];
        const categories = showAll ? item.mainCategory : item.mainCategory?.slice(0, 6);

        return (
          <div key={item._id} className="flex border border-gray-100 rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="w-1/4 border-r border-gray-300 p-4 flex flex-col justify-between">
              <div className="flex flex-col items-center text-center gap-3">
                <img
                  src={item?.imageUrl}
                  className="w-20 h-20 object-contain"
                />
              </div>

              <div className="flex flex-col justify-center gap-2 mt-4">
                <h2 className="font-semibold text-center text-gray-900 text-lg">
                  {item.name}
                </h2>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setForm({ industryId: item._id });
                      setAddModal(true);
                    }}
                    className="icon-btn-blue"
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    onClick={() => handleEditIndustry(item)}
                    className="icon-btn-red"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => deleteIndustry(item._id)}
                    className="icon-btn-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-3/4 p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories?.map((cat) => (
                  <div key={cat._id} className="border border-gray-300 rounded-lg p-3 hover:shadow-md hover:-translate-y-[2px] transition">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-900 text-base">
                        {cat.name}
                      </p>

                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setForm({
                              industryId: item._id,
                              parentCategoryId: cat._id,
                            });
                            setAddModal(true);
                          }}
                          className="mini-btn-blue"
                        >
                          <Plus size={16} />
                        </button>

                        <button
                          onClick={() => handleEditClick(cat)}
                          className="mini-btn-blue"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="mini-btn-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <ul className="text-sm space-y-1 grid grid-cols-2 gap-2">
                      {cat.subCategory?.length > 0 ? (
                        cat.subCategory.map((sub) => (
                          <li key={sub._id} onClick={() => handleEditClick(sub)}
                            className="flex items-center gap-1 px-2 py-1 rounded border border-gray-300 bg-[#074977]/5 text-gray-800 hover:bg-[#074977]/15 hover:text-[#074977] cursor-pointer transition"
                          >
                            <span className="text-[#074977]">●</span>
                            {sub.name}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-600 items-center">
                          No subcategories
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {item.mainCategory?.length > 6 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => toggleViewMore(item._id)}
                    className="flex items-center gap-1 text-sm text-[#074977] hover:underline"
                  >
                    {showAll ? "View Less" : "View More"}
                    <ChevronDown
                      size={14}
                      className={`transition ${showAll ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>);
      })}
    </div>
  );
}