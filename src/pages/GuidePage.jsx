import { useParams } from 'react-router-dom';
import Guide from '../components/Guide';
import guideData from '../datas/guideList.json';

function GuidePage() {
  const { id } = useParams();
  const guide = guideData.users.find((item) => item.id === Number(id));

  if (!guide) {
    return <div>Guide introuvable</div>;
  }

  return <Guide {...guide} />;
}

export default GuidePage;