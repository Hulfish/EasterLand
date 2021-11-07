import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MobileContext } from "./context/mobile_context";
import { changeChatFrameHeightAction, changeFrameHeightAction } from "./store/chat_frame_height_reducer";

function AppWrapper(props) {
  const setIsMobileToNav = props.setNavIsMobile;
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false);
  const [defaultFontSize, setDefaultFontSize] = useState(16);

  window.onresize = (e) => {
    const width = e.target.document.documentElement.clientWidth;
    //console.log(e.target.document.documentElement.clientWidth);
    if (width < 576) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    if (width < 975) {
      setIsMobileToNav(true);
    } else {
      setIsMobileToNav(false);
    }
      const displayHeight = document.documentElement.clientHeight;
      const height = displayHeight - 137
      dispatch(changeChatFrameHeightAction(height))
  };

  useEffect(() => {
    const width = window.document.documentElement.clientWidth;
    if (width < 576) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    if (width < 976) {
      setIsMobileToNav(true);
    } else {
      setIsMobileToNav(false);
    }
    const displayHeight = document.documentElement.clientHeight;
      const height = displayHeight - 137
      dispatch(changeChatFrameHeightAction(height))
  }, []);
  useEffect(() => {
    if (!isMobile) {
      setDefaultFontSize(18);
    } else {
      setDefaultFontSize(14);
    }
  }, [isMobile]);

  
    return (
      <div class="app">
        <div class="container">
          
          <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-xl-8 col-md-8 content">
              <div class=" mb-50">
                <MobileContext.Provider
                  value={{
                    isMobile,
                    defaultFontSize,
                  }}
                >
                  <PageWrapper isMobile={isMobile}>
                    <div class="mt-80"></div>
                    {props.children}
                  </PageWrapper>
                </MobileContext.Provider>
              </div>
            </div>
            <div class="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  
}

function PageWrapper(props) {
  // console.log(props.isMobile);
  if (!props.isMobile) {
    return <div class="ml-50 mr-50">{props.children}</div>;
  }

  return <>
  {props.children}</>;
}

export default AppWrapper;
