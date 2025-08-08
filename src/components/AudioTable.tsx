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
  | "compression";
type SortOrder = "asc" | "desc";

const SortButton: React.FC<{
  field: SortField;
  children: React.ReactNode;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}> = ({ field, children, sortField, sortOrder, onSort }) => (
  <button onClick={() => onSort(field)}>
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
    // Styles removed
    return "";
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th aria-label="Logo">Logo</th>
            <th>
              <SortButton
                field="title"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              >
                Name
              </SortButton>
            </th>
            <th>Description</th>
            <th>High-res</th>
            <th>
              <SortButton
                field="sampleFrequency"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              >
                Sample frequency
              </SortButton>
            </th>
            <th>
              <SortButton
                field="bitDepth"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              >
                Bit depth
              </SortButton>
            </th>
            <th>
              <SortButton
                field="bitRate"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              >
                Bit rate
              </SortButton>
            </th>
            <th>
              <SortButton
                field="compression"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              >
                Compression
              </SortButton>
            </th>
            <th scope="col" aria-label="Streaming services">
              Streaming
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedPosts.map((post, index) => (
            <tr key={index}>
              <td aria-label="Logo">
                <img
                  src={post.data.logo || "/placeholder.svg"}
                  alt={`${post.data.title} logo`}
                  title={`${post.data.title} logo`}
                  loading="lazy"
                />
              </td>
              <td>{post.data.title}</td>
              <td>{post.data.description}</td>
              <td aria-label="High-res">
                {post.data.highres && (
                  <img
                    src="/icons/technologies/highres.svg"
                    alt="High-Res Audio"
                    title="High-Res Audio"
                    loading="lazy"
                  />
                )}
              </td>
              <td>{post.data.sampleFrequency}</td>
              <td>{post.data.bitDepth}</td>
              <td>{post.data.bitRate}</td>
              <td>
                <span>
                  <span
                    className={`pill ${
                      post.data.compression.toLowerCase() === "lossy"
                        ? "pill-danger"
                        : ""
                    }`}
                  >
                    {post.data.compression}
                  </span>
                </span>
              </td>
              <td aria-label="Streaming services">
                {post.data.streaming && post.data.streaming.length > 0 ? (
                  <div>
                    {post.data.streaming.map((stream, streamIndex) => (
                      <div>
                        {stream && (
                          <img
                            key={streamIndex}
                            src={`/icons/services/${stream.toLowerCase()}.svg`}
                            alt={`${stream} icon`}
                            title={`Streaming on ${stream}`}
                            loading="lazy"
                          />
                        )}
                        <span>{stream}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioTable;
