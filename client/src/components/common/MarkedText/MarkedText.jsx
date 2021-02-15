import Text from "antd/lib/typography/Text";
import React from "react";

const MarkedText = ({ word, filtredWord }) => {
  return typeof word === "string"
    ? word
    : word &&
        word.map((t, index) => {
          return filtredWord.toLowerCase() === t.toLowerCase() ? (
            <Text key={`${index}`} mark>
              {t}
            </Text>
          ) : (
            <span key={`${index}`}>{t}</span>
          );
        });
};

export default MarkedText;
