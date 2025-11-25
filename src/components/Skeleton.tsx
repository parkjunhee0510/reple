import React from "react";
import "../styles/Skeleton.css";

interface Props {
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}

const Skeleton = ({ width = "100%", height = "16px", circle = false }: Props) => {
    return (
        <div
            className="skeleton-box"
            style={{
                width,
                height,
                borderRadius: circle ? "50%" : "6px",
            }}
        />
    );
};

export default Skeleton;
