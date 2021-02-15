import { useState } from "react";

export const useModal = (title, func, ...params) => {
  const [visible, setisVisible] = useState(false);

  const onOk = () => {
    func(...params);

    setisVisible(false);
  };

  const onCancel = () => {
    setisVisible(false);
  };
  const openModal = () => setisVisible(true);
  return {
    bind: {
      title,
      visible,
      onOk,
      onCancel,
    },
    openModal,
  };
};
