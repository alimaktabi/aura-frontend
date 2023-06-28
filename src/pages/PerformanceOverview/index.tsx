import ProfileInfo from '../../components/Shared/ProfileInfo';
import LinkCard from './LinkCard';

const PerformanceOverview = () => {
  return (
    <div className="page flex flex-col gap-4">
      <ProfileInfo isPerformance={true} />
      <LinkCard />
    </div>
  );
};

export default PerformanceOverview;
