import { m, useMotionValue, useTransform } from "framer-motion";

// ----------------------------------------------------------------------

export default function Readed({ isChecked }) {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])

  return (
    <div>
      <m.div
        style={{
          width: 150,
          height: 150,
          borderRadius: 30,
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
        animate={{
          scale: isChecked ? 1 : 0.8,
          backgroundColor: isChecked
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255 ,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
        >
          <m.path
            d="M38 74.707l24.647 24.646L116.5 45.5"
            fill="transparent"
            strokeWidth="20"
            stroke="#39e"
            strokeLinecap="round"
            initial={{ pathLength: 0.9, opacity: 1 }}
            animate={{ pathLength: isChecked ? 0.9 : 0 }}
            style={{ pathLength: pathLength, opacity: opacity }}
          />
        </svg>
      </m.div>
    </div>
  )
}
