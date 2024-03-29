type LoadingScreenProps = {
  getProducts?: boolean,
  getProduct?: boolean,
}

function LoadingScreen({
  getProducts = false,
  getProduct = false,
}: LoadingScreenProps) {
  const containerStyle: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#26333D', // Dark background color
    color: '#fff', // Secondary text color
  };

  const textStyles: React.CSSProperties = {
    marginTop: '16px',
  };

  let loadingText = 'Loading...';

  if (getProduct) {
    loadingText = 'Carregando produto';
  } else if (getProducts) {
    loadingText = 'Carregando produtos';
  }

  return (
    <div style={containerStyle}>
      <svg
        width="80"
        height="80"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff" // Progress indicator color
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
      <p style={textStyles}>{loadingText}</p>
    </div>
  );
}

export default LoadingScreen;
