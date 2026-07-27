import { useParams } from 'react-router-dom';
import Guide from '../components/Guide';
import { GuideList } from '../datas/GuideList';

function GuidePage() {
  const { id } = useParams();
  const guide = GuideList[Number(id)];

  if (!guide) {
    return <div>Guide introuvable</div>;
  }

  return <Guide {...guide} />;
}

export default GuidePage;