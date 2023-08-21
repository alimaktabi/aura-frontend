import ProfileInfo from '../../components/Shared/ProfileInfo';
import LinkCard from './LinkCard';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../store/profile/selectors.ts';
import ActivitiesCard from '../../components/Shared/ActivitiesCard/index.tsx';

const PerformanceOverview = () => {
  const authData = useSelector(selectAuthData);
  if (!authData) {
    return <div>Not logged in</div>;
  }
  return (
    <div className="page flex flex-col gap-4">
      <ProfileInfo subjectId={authData.brightId} isPerformance={true} />
      <ActivitiesCard />
      <LinkCard />
    </div>
  );
};

export default PerformanceOverview;
