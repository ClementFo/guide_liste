import App from '../components/App';
import guideData from '../datas/guideList.json';

function GuideListPage() {
  return <App GuideList={guideData.users} />;
}

export default GuideListPage;
