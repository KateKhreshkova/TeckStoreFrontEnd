import React from 'react';

const PurpleButton = ({children, ...props}) => {
    return (
        <button
            style={{
                background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                color: "white",
                padding: "8px 15px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}

            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 3px 10px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
            {...props}>{children}
        </button>
    );
};
export default PurpleButton;