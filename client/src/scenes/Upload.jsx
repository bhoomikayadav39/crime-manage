import { useState } from "react";
import { UploadCloud, UserSearch, ShieldCheck } from "lucide-react";

export default function Upload() {
  const [suspectResult, setSuspectResult] = useState(null);

  const handleSuspectUpload = () => {
    // UI-only mock result
    setSuspectResult("Suspect detected – Match found in criminal database");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
            Criminal Identification Portal
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload verified criminal images to strengthen the database or upload
            suspect images to check for possible matches using AI-powered facial
            comparison.
          </p>
        </div>

        {/* Upload Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Criminal Upload Section */}
          <div className="relative bg-neutral-900 border border-blue-600 rounded-3xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-blue-500" size={28} />
              <h2 className="text-2xl font-semibold text-blue-400">
                Criminal Image Database
              </h2>
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Upload confirmed criminal images. These images will be securely
              stored and used as reference data for future suspect comparisons.
            </p>

            <div className="border-2 border-dashed border-blue-500/40 rounded-2xl p-10 text-center hover:border-blue-500 transition">
              <UploadCloud className="mx-auto mb-4 text-blue-500" size={40} />
              <p className="text-gray-400 text-sm mb-4">
                Drag & drop an image or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                className="block mx-auto text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
            </div>

            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold tracking-wide">
              Add to Criminal Database
            </button>
          </div>

          {/* Suspect Upload Section */}
          <div className="relative bg-neutral-900 border border-blue-600 rounded-3xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <UserSearch className="text-blue-500" size={28} />
              <h2 className="text-2xl font-semibold text-blue-400">
                Suspect Identification
              </h2>
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Upload a suspect image to compare against the criminal database and
              detect potential matches.
            </p>

            <div className="border-2 border-dashed border-blue-500/40 rounded-2xl p-10 text-center hover:border-blue-500 transition">
              <UploadCloud className="mx-auto mb-4 text-blue-500" size={40} />
              <p className="text-gray-400 text-sm mb-4">
                Drag & drop an image or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                className="block mx-auto text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
            </div>

            <button
              onClick={handleSuspectUpload}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold tracking-wide"
            >
              Run Identification Scan
            </button>

            {suspectResult && (
              <div className="mt-8 p-5 rounded-xl bg-black border border-blue-500 text-center shadow-[0_0_25px_rgba(37,99,235,0.3)]">
                <p className="text-blue-400 font-semibold text-lg">
                  ✔ {suspectResult}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Confidence score and detailed report will be available after
                  backend integration.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
       
      </div>
    </div>
  );
}
