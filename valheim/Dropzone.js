import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// get offset of bytes after occurrence of 'ascii' that occurs at/after 'pos' in 'buf'
function findText(buf, pos, ascii) {
  // grab a uint8array of the ascii string to find
  let encoder = new TextEncoder();
  let findview = encoder.encode(ascii);
  let endsz = buf.byteLength - findview.byteLength;
  console.log("Searching " + endsz + " bytes starting from " + pos + " looking for " + ascii);
  // return the first occurrence
  for (let iter_buf = pos; iter_buf != endsz; iter_buf++) {
    for (let iter_find = 0; iter_find != findview.byteLength; iter_find++) {
      if (findview[iter_find] != buf[iter_buf + iter_find]) break;
      if (iter_find == findview.byteLength - 1)
        return iter_buf + findview.byteLength;
    }
  }
  // if we didn't find it...
  return -1;
}

function getVendorLocations(name, buf, len, vendor_id, vendor_name) {
  console.log(name, buf, len);
  let locations = [];
  // Vendor_Blackforest and Hildir_camp non-null-terminated is followed by its 32bit float x/z/y coordinates
  let offset = findText(buf, 0, vendor_id);
  if (offset === -1) {
    return [vendor_name + "'s not found.", locations];
  }
  while (offset !== -1) {
    let coordview = new DataView(buf.buffer, offset);
    // little endian floats
    let x = coordview.getFloat32(0, true);
    let z = coordview.getFloat32(4, true);
    let y = coordview.getFloat32(8, true);
    console.log(
      "found "+vendor_name+": (" +
        x.toFixed(4) +
        "," +
        y.toFixed(4) +
        "," +
        z.toFixed(4) +
        ")"
    );
    locations.push({ x: x, y: y, z: z });
    offset = findText(buf, offset, vendor_id);
  }
  return [null, locations];
}

function getTraderLocations(name, buf, len) {
  return getVendorLocations(name, buf, len, "Vendor_BlackForest", "Haldor");
}

function getHildirLocations(name, buf, len) {
  return getVendorLocations(name, buf, len, "Hildir_camp", "Hildir");
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
      const [errorHaldor, locationsHaldor] = getTraderLocations(
        worldFile.name,
        new Uint8Array(reader.result),
        reader.result.byteLength
      );
      const [errorHildir, locationsHildir] = getHildirLocations(
        worldFile.name,
        new Uint8Array(reader.result),
        reader.result.byteLength
      );
      if (errorHaldor && errorHildir) {
        setError(errorHaldor + " " + errorHildir);
        return;
      }
      onLocationsFound([worldFile.name.slice(0, -'.db'.length), locationsHaldor, locationsHildir]);
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
