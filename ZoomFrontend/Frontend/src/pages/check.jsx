
import { useParams } from 'react-router-dom';

function check() {
  const { url } = useParams(); // Get the dynamic URL parameter

  return (
    <div>
      <h1>Welcome to the Meeting</h1>
      <p>Your meeting URL is: {url}</p>
      {/* You can add more functionality here to join the meeting */}
    </div>
  );
}

export default check;
