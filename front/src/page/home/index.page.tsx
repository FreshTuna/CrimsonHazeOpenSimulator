import { InputNumber, Button, Image, Checkbox } from "antd";
import { useState } from "react";
import { jsx, css } from "@emotion/react";
import ResultModal from "../../component/ResultModal";
import { InputNumberProps } from "antd/lib/input-number";

const Home = () => {
  const [count, setCount] = useState(1);
  const [generateYn, setGenerateYn] = useState(false);
  const [aceCardInclude, setAceCardInclude] = useState(false);
  const [genereatedCount, setGeneratedCount] = useState(1);
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const onChange: InputNumberProps["onChange"] = (value: any) => {
    setCount(Number(value));
  };

  const generate = () => {
    setGenerateYn(true);
    setGeneratedCount(count);
  };

  return (
    <div>
      <div css={title}>Crimson Haze Open Simulator</div>
      <div css={HomeWrapper}>
        <InputNumber min={1} max={30} value={count} onChange={onChange} />
        <Button onClick={generate} type="primary">
          Generate
        </Button>
      </div>
      <div css={boosterPackContainer}>
        <div css={boosterPackWrapper}>
          {generateYn && (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {[...Array(genereatedCount)].map((_, index) => (
                <Image width={100} src="src/assets/crimson haze.png" />
              ))}
            </Image.PreviewGroup>
          )}
        </div>
      </div>

      <div css={openButton}>
        {generateYn && (
          <>
            <Button
              style={{ width: "80%" }}
              onClick={() => setResultModalVisible(true)}
            >
              Open Pack!
            </Button>
          </>
        )}
      </div>
      {generateYn && (
        <div css={includePack}>
          <Checkbox
            checked={aceCardInclude}
            onChange={() => setAceCardInclude(!aceCardInclude)}
            style={{ alignItems: "center" }}
          >
            Include ACE
          </Checkbox>
        </div>
      )}
      <ResultModal
        visibleYn={resultModalVisible}
        handleVisibleYn={() => setResultModalVisible(!resultModalVisible)}
        count={count}
        aceIncludeYn={aceCardInclude}
      />
    </div>
  );
};

const HomeWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 7px;
  margin-top: 60px;
  justify-content: center;
`;

const title = css`
  font-size: 48px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const boosterPackWrapper = css`
  width: 80%;
  height: 300px;
  overflow-y: scroll;
`;

const boosterPackContainer = css`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const openButton = css`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const includePack = css`
  margin-top: 10px;
`;

export default Home;
