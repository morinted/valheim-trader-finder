import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// get offset of bytes after occurrence of 'ascii' that occurs at/after 'pos' in 'buf'
function findText(buf, pos, ascii) {
  // grab a uint8array of the ascii string to find
  var encoder = new TextEncoder();
  var findview = encoder.encode(ascii);
  var endsz = buf.byteLength - findview.byteLength;
  console.log("Searching " + endsz + " bytes starting from " + pos);
  // return the first occurrence
  for (var iter_buf = pos; iter_buf != endsz; iter_buf++) {
    for (var iter_find = 0; iter_find != findview.byteLength; iter_find++) {
      if (findview[iter_find] != buf[iter_buf + iter_find]) break;
      if (iter_find == findview.byteLength - 1)
        return iter_buf + findview.byteLength;
    }
  }
  // if we didn't find it...
  return -1;
}

function getTraderLocations(name, buf, len) {
  //var searchForString = "Vendor_BlackForest";
  var searchForString = "SunkenCrypt4";
  
  console.log(name, buf, len);
  var locations = [];
  // Vendor_Blackforest non-null-terminated is followed by its 32bit float x/z/y coordinates
  var offset = findText(buf, 0, searchForString);
  if (offset === -1) {
    return ["World file doesn't look right. Maybe the game changed?", []];
  }
  while (offset !== -1) {
    var coordview = new DataView(buf.buffer, offset);
    // little endian floats
    var x = coordview.getFloat32(0, true);
    var z = coordview.getFloat32(4, true);
    var y = coordview.getFloat32(8, true);
    console.log(
      "found trader: (" +
        x.toFixed(4) +
        "," +
        y.toFixed(4) +
        "," +
        z.toFixed(4) +
        ")"
    );
    locations.push({ x: x, y: y, z: z });
    offset = findText(buf, offset, searchForString);
  }
  return [null, locations];
}

export function Dropzone({ onLocationsFound }) {
  const [error, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    setError('')
    const worldFile = acceptedFiles.find((file) => file.path.endsWith("db"));
    if (!worldFile) {
      setError("No .db files were found. Please try again.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const [error, locations] = getTraderLocations(
        worldFile.name,
        new Uint8Array(reader.result),
        reader.result.byteLength
      );
      if (error) {
        setError(error);
        return;
      }
      onLocationsFound([worldFile.name.slice(0, -'.db'.length), locations]);
    };
    reader.readAsArrayBuffer(worldFile);
    console.log(worldFile);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        padding: "1rem 2rem",
        background: "#efefef",
        border: "1px dashed #aeaeae",
        borderRadius: "0.5rem",
      }}
    >
      {error && (
        <div
          style={{
            background: "#FFEBEE",
            border: '1px solid #D32F2F',
            borderRadius: '0.5rem',
            color: "#C62828",
            padding: "0.5rem 1rem",
          }}
        >
          {error}
        </div>
      )}
      <input {...getInputProps()} />
      <p>Drop your world.db here</p>
    </div>
  );
}
