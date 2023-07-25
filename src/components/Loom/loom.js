import "./style.css";
import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useRef, useEffect, useState } from "react";
import { SiLoom } from 'react-icons/si';



const PUBLIC_APP_ID = "100b1b6b-5e21-486f-9c91-9fa0ff2a1a60"; /* sandbox */
// const PUBLIC_APP_ID = "8f3ec782-1bd1-40a6-ab47-e8b199c996b9";
// const PUBLIC_APP_ID = "a3cd8ab9-3e9b-41b4-a715-856689a4be77";
const BUTTON_ID = "loom-record-sdk-button";

const Loom = () => {

  const [videoHTML, setVideoHTML] = useState("");
  const ref = useRef(null);



  async function setupLoom() {
    const { supported, error } = await isSupported();

    if (!supported) {
      console.warn(`Error setting up Loom: ${error}`);
      return;
    }

    const button = ref.current;

    if (!button) {
      return;
    }
    const { configureButton } = await setup({
      publicAppId: PUBLIC_APP_ID
    });

    const sdkButton = configureButton({ element: button });

    sdkButton.on("insert-click", async (video) => {
      const { html } = await oembed(video.sharedUrl, { width: 400 });
      setVideoHTML(html);
    });
  }
  useEffect(() => {
    setupLoom();
  }, [BUTTON_ID], ref);


  return (
    <>
      <div className='loom_icon'>
        <button id={BUTTON_ID} ref={ref}>
          <SiLoom className='connectIcon' size={13} />
        </button>
      </div>
      <div className="loom_video_wc" dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
    </>
  );
}

export default Loom;


