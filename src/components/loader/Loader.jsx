import { BallTriangle } from 'react-loader-spinner';

const Loader = () => (
  <div className="loader-container">
    <BallTriangle color="#3f51b5" height={100} width={100} timeout={3000} />
  </div>
);

export default Loader;
