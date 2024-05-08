import React, { useState, useRef } from "react";
import "./ImgGenerator.css";
import default_img from "../../assets/default_img.svg";

const ImgGenerator = () => {
  const [imgUrl, setImgUrl] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  let inputRef = useRef(null);
  let URL = "https://api.openai.com/v1/images/generations";

  const imgGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setIsLoading(true);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer sk-proj-eWKRUAtUWcDmm18qIDCkT3BlbkFJwxtspuK3klFBfQbz26ot",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });
    let data = await response.json();
    setImgUrl(data.data[0].url);
    setIsLoading(false);
    console.log(data);
  };
  return (
    <>
      <div className="AI_imgGenerator">
        <h2>
          AI Image <span>Generator</span>
        </h2>
        <div className="img_container">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <img src={imgUrl === "/" ? default_img : imgUrl} />
          )}
        </div>
        <div className="search-input">
          <input
            ref={inputRef}
            type="text"
            className="search-img"
            placeholder="Describe What You Want To See"
          />
          <div className="generate-btn"></div>
        </div>
        <div className="btn">
          <button
            onClick={() => {
              imgGenerator();
            }}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default ImgGenerator;
