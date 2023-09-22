const AvatarCardWrapper: React.FC = () => (
  <svg
    width="276"
    height="190"
    viewBox="0 0 276 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="5.99994"
      width="276"
      height="184"
      rx="20"
      fill="url(#paint0_linear_8_17)"
    />
    <path
      d="M83.113 62.1589C79.0174 46.9811 93.5433 34.8132 101.318 30.6265C106.82 27.8919 120.942 21.5927 133.422 18.2725C149.021 14.1223 167.649 38.0336 176.044 42.8807C184.44 47.7278 195.531 78.728 181.536 102.967C167.542 127.206 141.521 113.613 126.939 117.493C112.358 121.373 82.9284 114.678 92.7122 97.7318C102.496 80.7858 88.2326 81.1311 83.113 62.1589Z"
      fill="black"
      fillOpacity="0.1"
    />
    <circle cx="138" cy="73.9999" r="38" fill="url(#paint1_radial_8_17)" />
    <g filter="url(#filter0_d_8_17)">
      <circle
        cx="137.5"
        cy="74.4999"
        r="29.5"
        fill="url(#paint2_radial_8_17)"
        shapeRendering="crispEdges"
      />
    </g>
    <circle cx="42" cy="147" r="22" fill="#D9D9D9" fillOpacity="0.2" />
    <circle cx="227.5" cy="159.5" r="9.5" fill="black" fillOpacity="0.2" />
    <circle cx="68" cy="173" r="4" fill="#D9D9D9" fillOpacity="0.2" />
    <defs>
      <filter
        id="filter0_d_8_17"
        x="107"
        y="43.9999"
        width="61"
        height="61"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="1"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow_8_17"
        />
        <feOffset />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_8_17"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_8_17"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_8_17"
        x1="3.99999"
        y1="5.99995"
        x2="284.34"
        y2="162.527"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#018767" />
        <stop offset="1" stopColor="#716EF9" />
      </linearGradient>
      <radialGradient
        id="paint1_radial_8_17"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(138 73.9999) rotate(90) scale(38)"
      >
        <stop stopColor="#EAEAEA" stopOpacity="0.5" />
        <stop offset="1" stopColor="#FCFDFF" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_8_17"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(137.5 74.4999) rotate(90) scale(29.5)"
      >
        <stop stopColor="#EAEAEA" stopOpacity="0.5" />
        <stop offset="1" stopColor="#E9E9E9" />
      </radialGradient>
    </defs>
  </svg>
);

export default AvatarCardWrapper;
