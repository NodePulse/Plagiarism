"use client"

import React, { useState } from "react";

export default function Home() {

  const [code, setCode] = useState("")
  const [finalCode, setFinalCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedTransformations, setSelectedTransformations] = useState({
    renameVariables: true,
    addComments: false,
    reformatCode: false,
    restructureLogic: false
  });

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    setFinalCode("")
  }

  const handleTransformationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name } = target;

    if (target instanceof HTMLInputElement) {
      setSelectedTransformations(prevState => ({
        ...prevState,
        [name]: target.checked,
      }));
    } else {
      setSelectedTransformations(prevState => ({
        ...prevState,
        [name]: target.value,
      }));
    }
  };

  const transformCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          selectedTransformations
        })
      })

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      setFinalCode(data.transformedCode);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="rounded-lg shadow-xl w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-300 mb-8 rounded-md p-3">Remove Plagiarism from your code</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="input-code" className="block text-lg font-medium mb-2 pl-2">
            Enter Your Code Here:
          </label>
          <textarea
            id="input-code"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm text-slate-300 font-mono resize-y min-h-[250px] scrollbar-hidden"
            value={code}
            onChange={handleCodeChange}
            placeholder="Paste your code here..."
            rows={10}
            cols={50}
          />
        </div>

        <div>
          <label htmlFor="output-code" className="block text-lg font-medium mb-2 pl-2">
            Transformed Code:
          </label>
          <textarea
            id="output-code"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm text-slate-300 font-mono resize-y min-h-[250px] scrollbar-hidden"
            value={finalCode}
            readOnly
            placeholder="Transformed code will appear here..."
            rows={10}
            cols={50}
          />
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-inner mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-200 mb-3">Transformation Options:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="renameVariables"
                checked={selectedTransformations.renameVariables}
                onChange={handleTransformationChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2">Rename Variables & Functions</span>
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="addComments"
                checked={selectedTransformations.addComments}
                onChange={handleTransformationChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2">Add/Rephrase Comments</span>
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="reformatCode"
                checked={selectedTransformations.reformatCode}
                onChange={handleTransformationChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2">Reformat Code (Indentation, Spacing)</span>
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="restructureLogic"
                checked={selectedTransformations.restructureLogic}
                onChange={handleTransformationChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2">Slightly Restructure Logic</span>
            </label>
          </div>
        </div>

        <button
          onClick={transformCode}
          className={`w-full py-3 px-6 rounded-md text-white font-semibold transition-all duration-300
                                    ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
          disabled={isLoading || !code.trim()}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transforming Code...
            </span>
          ) : (
            'Transform Code'
          )}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
