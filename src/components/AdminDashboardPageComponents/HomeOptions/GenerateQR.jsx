/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// labby-labs\frontEnd\src\components\AdminDashboardPageComponents\HomeOptions\GenerateQR.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./GenerateQRCss.css";
import QRCode from "react-qr-code";
import { FaHandPointDown } from "react-icons/fa";

const GenerateQR = ({
  city,
  onCityChange,
  companyName,
  onCompanyNameChange,
  packages,
  onPackagesChange,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isQRReady, setIsQRReady] = useState(false);
  const inputRef = useRef(null);
  const suggestionBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCityChange = async (event) => {
    const input = event.target.value;
    onCityChange(input);
    if (input.length > 2) {
      // Fetch suggestions if input length is greater than 2
      const apiKey = "e2458fe98d2c4bd1a8193ca60f0bb01d";
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`,
          {
            params: {
              q: input,
              key: apiKey,
              countrycode: "IN", // Filter results to India
              limit: 10, // Limit the number of suggestions
            },
          }
        );
        const results = response.data.results;
        const filteredSuggestions = results
          .map((result) => {
            const cityComponent =
              result.components.city ||
              result.components.town ||
              result.components.village ||
              result.formatted;
            return cityComponent;
          })
          .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicate suggestions
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onCityChange(suggestion);
    setSuggestions([]);
  };

  const handleNextClick = async () => {
    if (
      city &&
      companyName &&
      packages.package1 &&
      packages.package2 &&
      packages.package3 &&
      packages.package4
    ) {
      try {
        const response = await axios.post(
          "https://pavancheckmedbackend-2.onrender.com/api/generateqr",
          {
            city,
            companyName,
            package1: packages.package1,
            package2: packages.package2,
            package3: packages.package3,
            package4: packages.package4,
          }
        );
        if (response.status === 200) {
          setIsQRReady(true);
        }
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handlePackageChange = (e, packageName) => {
    onPackagesChange({ ...packages, [packageName]: e.target.value });
  };

  const qrCodeValue = `/home-page/${city}/${companyName}`;

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Generate QR</h3>
      </div>
      <div className="main-body">
        <form style={{ width: "350px", position: "relative" }}>
          <div className="form-group">
            <span style={{ color: "#1B9DF5" }}>
              Current Location<span style={{ color: "red" }}>*</span> :
            </span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                borderWidth: "3px",
                position: "relative",
              }}
              value={city}
              onChange={handleCityChange}
              ref={inputRef}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list" ref={suggestionBoxRef}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <span style={{ color: "#1B9DF5" }}>
              Company Name<span style={{ color: "red" }}>*</span> :
            </span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              value={companyName}
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                borderWidth: "3px",
              }}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              onFocus={() => setSuggestions([])}
            />
            <span style={{ color: "#1B9DF5" }}>
              Package 1<span style={{ color: "red" }}>*</span> :
            </span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                borderWidth: "3px",
              }}
              value={packages.package1}
              onChange={(e) => handlePackageChange(e, "package1")}
              onFocus={() => setSuggestions([])}
            />
            <span style={{ color: "#1B9DF5" }}>
              Package 2<span style={{ color: "red" }}>*</span> :
            </span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                borderWidth: "3px",
              }}
              value={packages.package2}
              onChange={(e) => handlePackageChange(e, "package2")}
              onFocus={() => setSuggestions([])}
            />
            <span style={{ color: "#1B9DF5" }}>
              Package 3<span style={{ color: "red" }}>*</span> :
            </span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                borderWidth: "3px",
              }}
              value={packages.package3}
              onChange={(e) => handlePackageChange(e, "package3")}
              onFocus={() => setSuggestions([])}
            />
            <span style={{ color: "#1B9DF5" }}>
              Package 4<span style={{ color: "red" }}>*</span> :
            </span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                borderWidth: "3px",
              }}
              value={packages.package4}
              onChange={(e) => handlePackageChange(e, "package4")}
              onFocus={() => setSuggestions([])}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              width: "100px",
              marginTop: "10px",
              backgroundColor: "#1B9DF5",
              borderColor: "#1B9DF5",
            }}
            onClick={handleNextClick}
          >
            Next
          </button>
        </form>
        <h1 style={{ color: "black" }}>
          Here's the QR link <FaHandPointDown />
        </h1>
        {/* Generate QR code */}
        <div
          className={`qr-code-container ${isQRReady ? "" : "blur"}`}
          style={{
            height: "auto",
            margin: "20px 0",
            maxWidth: 264,
            width: "100%",
            marginLeft: "40px",
            position: "relative",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={isQRReady ? `https://qr-module.vercel.app${qrCodeValue}` : ""}
            viewBox={`0 0 256 256`}
          />

          <a
            style={{ color: "purple", cursor: "pointer" }}
            onClick={() => window.open(qrCodeValue, "_blank")}
          >
            https://qr-module.vercel.app{qrCodeValue}
          </a>

          {!isQRReady && (
            <div className="qr-placeholder-text">
              Enter details to create QR
            </div>
          )}
        </div>
        {/* Modal logic here */}
      </div>
    </main>
  );
};

export default GenerateQR;
