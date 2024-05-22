import {Modal, Image, Button} from "antd";
import {useState, useEffect, useRef} from "react";
import { openBoosterPack } from "../../src/util/openBoosterPack";
import { css } from "@emotion/react";
import html2canvas from "html2canvas";

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
  const [boosterPackList, setBoosterPackList] = useState<string[]>([]);
  const [boosterPackOpenYn, setBoosterPackOpenYn] = useState(false);
  const [resortPackYn, setResortPack] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleYn) {
      setBoosterPackList(openBoosterPack(count, aceIncludeYn));
      setBoosterPackOpenYn(true);
    }
  }, [visibleYn]);

  const handleSortPackList = () => {
    setBoosterPackOpenYn(false);
    setResortPack(true);
  }

  const handleCancel = () => {
    handleVisibleYn();
  }

  useEffect(() => {
    const sortedPackList = boosterPackList.sort();
    setBoosterPackList(sortedPackList)
    setResortPack(false);
    setBoosterPackOpenYn(true);
  }, [resortPackYn])

  const handleDownload = () => {
    if (cardContainerRef.current) {
      html2canvas(cardContainerRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'cards.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(error => {
        console.error('Error generating image:', error);
      });
    }
  };

  return (
    <Modal open={visibleYn} onCancel={handleCancel} width={900} onOk={handleDownload} okText={"download"} cancelText={"cancel"}>
      <div css={openBoosterPackContainer} ref={cardContainerRef}>
        {boosterPackOpenYn &&
            <Image.PreviewGroup>
              {boosterPackList.map((value, index) => (
                <Image
                  src={`/crimson_haze/jap/downloaded_image_${value}.jpg`}
                  key={index}
                  width={170}
                  style={{ padding: "5p 5px 5px 5px" }}
                />
              ))}
            </Image.PreviewGroup>
          }
      </div>
      <div css={sortBoosterPackContainer}>
        <Button type={"primary"} size={"large"} onClick={handleSortPackList}>Sort Card List</Button>
      </div>
    </Modal>
  );
};

export default ResultModal;

const openBoosterPackContainer = css`
  height: 100%;
`;

const sortBoosterPackContainer = css`
  padding-top: 12px;
  height: 20px;
  width: 100%; 
  display:flex;
  justify-content: center;
`;