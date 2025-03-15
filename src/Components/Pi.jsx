import { useEffect, useState, useRef } from "react";

export default function PiComponent() {
  const [piDigits, setPiDigits] = useState("");
  const [piChunks, setPiChunks] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const initialFontSize = 64;
  const fontSizeDecrement = 2;
  const minFontSize = 10;

  useEffect(() => {
    fetch("https://piday-api.onrender.com/pi")
      .then((res) => res.json())
      .then((data) => {
        setPiDigits(data.pi);
      })
      .catch((err) => console.error("Erro ao buscar Pi:", err));
  }, []);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  useEffect(() => {
    if (!containerWidth || !piDigits) return;

    const splitTextIntoChunks = (text, fontSize) => {
      const chunks = [];
      let startIndex = 0;

      while (startIndex < text.length) {
        const digitsPerLine = Math.floor(containerWidth / (fontSize * 0.6));
        const endIndex = startIndex + digitsPerLine;
        chunks.push(text.slice(startIndex, endIndex));
        startIndex = endIndex;
      }

      return chunks;
    };

    const chunks = [];
    let currentFontSize = initialFontSize;

    for (let i = 0; i < piDigits.length; ) {
      const digitsPerLine = Math.floor(containerWidth / (currentFontSize * 0.6));
      const endIndex = i + digitsPerLine;
      chunks.push(piDigits.slice(i, endIndex));
      i = endIndex;
      currentFontSize = Math.max(currentFontSize - fontSizeDecrement, minFontSize);
    }

    setPiChunks(chunks);
  }, [piDigits, containerWidth]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", margin: "auto", textAlign: "left" }}
    >
      {piChunks.map((chunk, index) => {
        const currentFontSize = initialFontSize - index * fontSizeDecrement;
        const fontSize = Math.max(currentFontSize, minFontSize);

        return (
          <p
            key={index}
            style={{
              fontSize: `${fontSize}px`,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: "1.2em",
              margin: 0,
              width: "100%",
              textAlign: "center"
            }}
          >
            {chunk}
          </p>
        );
      })}
    </div>
  );
}