import theme from "../styles/theme";
import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderConstants = {
    height: 128,
    animation_length: 232,
    animation_time: 1.5,
};

const anim = keyframes`
  12.5% {
    stroke-dasharray: ${LoaderConstants.animation_length * 0.14}px, ${LoaderConstants.animation_length}px;
    stroke-dashoffset: -${LoaderConstants.animation_length * 0.11}px;
  }
  43.75% {
    stroke-dasharray: ${LoaderConstants.animation_length * 0.35}px, ${LoaderConstants.animation_length}px;
    stroke-dashoffset: -${LoaderConstants.animation_length * 0.35}px;
  }
  100% {
    stroke-dasharray: ${LoaderConstants.animation_length * 0.01}px, ${LoaderConstants.animation_length}px;
    stroke-dashoffset: -${LoaderConstants.animation_length * 0.99}px;
  }
`;

const Path = styled.path`
  stroke-dasharray: ${LoaderConstants.animation_length * 0.01}px, ${LoaderConstants.animation_length};
  stroke-dashoffset: 0;
  animation: ${anim} ${LoaderConstants.animation_time}s linear infinite;
`;
const Loader: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}>
            <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <div data-testid="line-wave-wrapper" aria-label="line-wave-loading">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={LoaderConstants.height * 2}
                        height={LoaderConstants.height}
                        viewBox={`0 0 187.8 92.8`}
                        data-testid="infinity-spin"
                    >
                        <Path
                            data-testid="infinity-spin-path-1"
                            stroke={theme.colors.primary}
                            fill="none"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
                        />
                        <path
                            data-testid="infinity-spin-path-2"
                            opacity="0.07"
                            fill="none"
                            stroke={theme.colors.primary}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Loader;
