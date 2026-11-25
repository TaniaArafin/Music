import { useParams } from "react-router";
const MusicDetails = () => {
  const params = useParams();
  const { id } = useParams();
  return (
    <div>
      <h1>Music Details-{id}</h1>
    </div>
  );
};

export default MusicDetails;
