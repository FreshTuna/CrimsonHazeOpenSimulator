import { Button, Modal, Image } from "antd";
import { useState, useEffect } from "react";
import { openBoosterPack } from "../../src/util/openBoosterPack";
import { jsx, css } from "@emotion/react";

interface resultModalProps {
  count: number;
  aceIncludeYn: boolean;
  visibleYn: boolean;
  handleVisibleYn: () => void;
}

const ResultModal = ({
  count,
  aceIncludeYn,
  visibleYn,
  handleVisibleYn,
}: resultModalProps) => {
  const [boosterPackList, setBoosterPackList] = useState<string[][]>([]);
  const [boosterPackOpenYn, setBoosterPackOpenYn] = useState(false);

  useEffect(() => {
    if (visibleYn) {
      setBoosterPackList(openBoosterPack(count, aceIncludeYn));
      setBoosterPackOpenYn(true);
    }
  }, [visibleYn]);

  return (
    <Modal open={visibleYn} onCancel={handleVisibleYn} width={900}>
      <div css={openBoosterPackContainer}>
        {boosterPackOpenYn &&
          [...Array(count)].map((_, index) => (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image width={200} src={"crimson haze.png"} />
              {boosterPackList[index].map((value, index) => (
                <Image
                  src={value}
                  width={130}
                  style={{ padding: "5p 5px 5px 5px" }}
                />
              ))}
            </Image.PreviewGroup>
          ))}
      </div>
    </Modal>
  );
};

export default ResultModal;

const openBoosterPackContainer = css`
  height: 500px;
  overflow-y: scroll;
`;
