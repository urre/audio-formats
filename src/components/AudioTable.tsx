import React, { useMemo, useState } from "react";

interface AudioFormatData {
  title: string;
  description: string;
  logo?: string;
  highres: boolean;
  sampleFrequency: string;
  bitDepth: string;
  bitRate: string;
  compression: "Lossless" | "Lossy" | string;
  streaming?: string[];
  fileFormats: string[];
  audiophileLevel: string;
}

interface AudioFormatPost {
  data: AudioFormatData;
}

interface AudioTableProps {
  posts: AudioFormatPost[];
}

type SortField =
  | "title"
  | "sampleFrequency"
  | "bitDepth"
  | "bitRate"
  | "compression"
  | "audiophileLevel";
type SortOrder = "asc" | "desc";

const SortButton: React.FC<{
  field: SortField;
  children: React.ReactNode;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}> = ({ field, children, sortField, sortOrder, onSort }) => (
  <button
    onClick={() => onSort(field)}
    className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
  >
    {children}
    {sortField === field && (sortOrder === "asc" ? <> ↑</> : <>↓</>)}
  </button>
);

const AudioTable: React.FC<AudioTableProps> = ({ posts = [] }) => {
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "title":
          aValue = a.data.title.toLowerCase();
          bValue = b.data.title.toLowerCase();
          break;
        case "sampleFrequency":
          // Extract numeric value for sorting (e.g., "192 kHz" -> 192)
          aValue = parseFloat(
            a.data.sampleFrequency.match(/[\d.]+/)?.[0] || "0"
          );
          bValue = parseFloat(
            b.data.sampleFrequency.match(/[\d.]+/)?.[0] || "0"
          );
          break;
        case "bitDepth":
          aValue = parseFloat(a.data.bitDepth.match(/[\d.]+/)?.[0] || "0");
          bValue = parseFloat(b.data.bitDepth.match(/[\d.]+/)?.[0] || "0");
          break;
        case "bitRate":
          aValue = parseFloat(a.data.bitRate.match(/[\d.]+/)?.[0] || "0");
          bValue = parseFloat(b.data.bitRate.match(/[\d.]+/)?.[0] || "0");
          break;
        case "compression":
          aValue = a.data.compression.toLowerCase();
          bValue = b.data.compression.toLowerCase();
          break;
        case "audiophileLevel":
          // Count emoji characters for sorting
          aValue = (a.data.audiophileLevel.match(/🎵/g) || []).length;
          bValue = (b.data.audiophileLevel.match(/🎵/g) || []).length;
          break;
        default:
          aValue = "";
          bValue = "";
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
  }, [posts, sortField, sortOrder]);

  const getCompressionStyle = (compression: string) => {
    switch (compression) {
      case "Lossless":
        return "bg-green-100 text-blue-800";
      case "Lossy":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full p-16 bg-gray-50 min-h-screen transition-colors duration-300">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-4 text-left w-36 min-w-[4rem] whitespace-nowrap">
                  Logo
                </th>
                <th className="px-4 py-4 text-left whitespace-nowrap">
                  <SortButton
                    field="title"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  >
                    Name
                  </SortButton>
                </th>
                <th className="px-4 py-4 text-left w-64 min-w-[16rem] whitespace-nowrap">
                  Description
                </th>
                <th className="px-4 py-4 text-center whitespace-nowrap">
                  High-res
                </th>
                <th className="px-4 py-4 text-left whitespace-nowrap">
                  <SortButton
                    field="sampleFrequency"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  >
                    Sample frequency
                  </SortButton>
                </th>
                <th className="px-4 py-4 text-left whitespace-nowrap">
                  <SortButton
                    field="bitDepth"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  >
                    Bit depth
                  </SortButton>
                </th>
                <th className="px-4 py-4 text-left whitespace-nowrap">
                  <SortButton
                    field="bitRate"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  >
                    Bit rate
                  </SortButton>
                </th>
                <th className="px-4 py-4 text-left whitespace-nowrap">
                  <SortButton
                    field="compression"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  >
                    Compression
                  </SortButton>
                </th>
                <th className="px-4 py-4 text-center whitespace-nowrap">
                  Streaming
                </th>
                <th className="px-4 py-4 text-left whitespace-nowrap">
                  File formats
                </th>
                <th className="px-4 py-4 text-center whitespace-nowrap">
                  <SortButton
                    field="audiophileLevel"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  >
                    Audiophile level
                  </SortButton>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {sortedPosts.map((post, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <img
                      src={post.data.logo || "/placeholder.svg"}
                      alt={`${post.data.title} logo`}
                      title={`${post.data.title} logo`}
                      className="rounded object-contain invert h-24"
                      loading="lazy"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">
                      {post.data.title}
                    </div>
                  </td>
                  <td className="px-4 py-4 w-24">
                    <div className="text-gray-600">{post.data.description}</div>
                  </td>
                  <td className="px-4 py-4 w-12 text-center">
                    {post.data.highres && (
                      <img
                        className="object-contain h-12 w-12"
                        src="/icons/technologies/highres.svg"
                        alt="High-Res Audio"
                        title="High-Res Audio"
                        loading="lazy"
                      />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-900 text-sm">
                      {post.data.sampleFrequency}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-900 text-sm">
                      {post.data.bitDepth}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-900 text-sm">
                      {post.data.bitRate}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCompressionStyle(
                        post.data.compression
                      )}`}
                    >
                      {post.data.compression}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {post.data.streaming && post.data.streaming.length > 0 ? (
                      <div className="flex gap-2 flex-wrap justify-center">
                        {post.data.streaming.map((stream, streamIndex) => (
                          <img
                            key={streamIndex}
                            className="object-contain h-8 w-8 invert"
                            src={`/icons/services/${stream.toLowerCase()}.svg`}
                            alt={`${stream} icon`}
                            title={`Streaming on ${stream}`}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">None</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.data.fileFormats.map((ext, extIndex) => (
                        <span
                          key={extIndex}
                          className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-mono"
                        >
                          {ext.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-2xl">{post.data.audiophileLevel}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AudioTable;
